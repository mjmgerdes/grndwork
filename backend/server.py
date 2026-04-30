from fastapi import FastAPI, APIRouter, Depends, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone

from database import get_db, engine
from models import Waitlist


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (optional — only enabled if MONGO_URL is set)
mongo_url = os.environ.get('MONGO_URL')
if mongo_url:
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'grndwork')]
else:
    client = None
    db = None

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ============ Status Models (legacy) ============
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ============ Waitlist Models ============
class WaitlistCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    school: str = Field(..., min_length=1, max_length=255)
    graduation_year: int = Field(..., ge=2024, le=2035)
    career_interest: str = Field(..., min_length=1, max_length=500)


class WaitlistResponse(BaseModel):
    id: str
    name: str
    email: str
    school: str
    graduation_year: int
    career_interest: str
    created_at: datetime


# ============ Routes ============
@api_router.get("/")
async def root():
    return {"message": "grndwork API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    if db is None:
        raise HTTPException(status_code=503, detail="MongoDB not configured")
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is None:
        return []
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/waitlist", response_model=WaitlistResponse)
async def join_waitlist(payload: WaitlistCreate, session: AsyncSession = Depends(get_db)):
    entry = Waitlist(
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        school=payload.school.strip(),
        graduation_year=payload.graduation_year,
        career_interest=payload.career_interest.strip(),
    )
    session.add(entry)
    try:
        await session.commit()
        await session.refresh(entry)
    except Exception as e:
        await session.rollback()
        logger.exception("Waitlist insert failed")
        raise HTTPException(status_code=500, detail="Failed to join waitlist")

    return WaitlistResponse(
        id=entry.id,
        name=entry.name,
        email=entry.email,
        school=entry.school,
        graduation_year=entry.graduation_year,
        career_interest=entry.career_interest,
        created_at=entry.created_at,
    )


@api_router.get("/waitlist/count")
async def waitlist_count(session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Waitlist.id))
    count = len(result.scalars().all())
    return {"count": count}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()
    await engine.dispose()
