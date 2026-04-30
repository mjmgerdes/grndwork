"""Backend API tests for grndwork waitlist endpoints."""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://future-launch-4.preview.emergentagent.com').rstrip('/')


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Root endpoint
def test_root_returns_message(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("message") == "grndwork API"


# Waitlist count
def test_waitlist_count_returns_int(api):
    r = api.get(f"{BASE_URL}/api/waitlist/count")
    assert r.status_code == 200
    data = r.json()
    assert "count" in data
    assert isinstance(data["count"], int)


# Waitlist happy path
def test_waitlist_post_valid_persists(api):
    unique = uuid.uuid4().hex[:8]
    payload = {
        "name": f"TEST_User_{unique}",
        "email": f"test_{unique}@example.com",
        "school": "TEST_University",
        "graduation_year": 2027,
        "career_interest": "Software Engineering",
    }
    # capture before count
    before = api.get(f"{BASE_URL}/api/waitlist/count").json()["count"]

    r = api.post(f"{BASE_URL}/api/waitlist", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str)
    assert "created_at" in data
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"].lower()
    assert data["school"] == payload["school"]
    assert data["graduation_year"] == 2027
    assert data["career_interest"] == "Software Engineering"

    # verify count increased -> proves persistence
    time.sleep(0.5)
    after = api.get(f"{BASE_URL}/api/waitlist/count").json()["count"]
    assert after >= before + 1


# Validation: bad email
def test_waitlist_invalid_email_422(api):
    payload = {
        "name": "TEST_X",
        "email": "not-an-email",
        "school": "S",
        "graduation_year": 2026,
        "career_interest": "C",
    }
    r = api.post(f"{BASE_URL}/api/waitlist", json=payload)
    assert r.status_code == 422


# Validation: missing fields
def test_waitlist_missing_fields_422(api):
    r = api.post(f"{BASE_URL}/api/waitlist", json={"name": "TEST"})
    assert r.status_code == 422


# Validation: graduation_year out of range
@pytest.mark.parametrize("year", [2023, 2036, 1999])
def test_waitlist_grad_year_out_of_range_422(api, year):
    payload = {
        "name": "TEST_Y",
        "email": "y@example.com",
        "school": "S",
        "graduation_year": year,
        "career_interest": "C",
    }
    r = api.post(f"{BASE_URL}/api/waitlist", json=payload)
    assert r.status_code == 422
