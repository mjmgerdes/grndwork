import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime
from database import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


class Waitlist(Base):
    __tablename__ = "waitlist"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    school = Column(String(255), nullable=False)
    graduation_year = Column(Integer, nullable=False)
    career_interest = Column(String(500), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
