from datetime import datetime, timedelta, timezone
from typing import Any, Dict

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import get_settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

settings = get_settings()


def get_secret_key() -> str:
    return settings.secret_key


def get_algorithm() -> str:
    return settings.jwt_algorithm


def get_access_token_expiry_minutes() -> int:
    return settings.access_token_expire_minutes


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(subject: str, expires_delta: timedelta | None = None) -> dict[str, Any]:
    algorithm = get_algorithm()
    secret = get_secret_key()
    expire_delta = expires_delta or timedelta(minutes=get_access_token_expiry_minutes())

    expire_at = datetime.now(timezone.utc) + expire_delta
    payload = {"sub": subject, "exp": expire_at}
    token = jwt.encode(payload, secret, algorithm=algorithm)

    return {"access_token": token, "expires_at": expire_at}


def decode_token(token: str) -> Dict[str, Any]:
    return jwt.decode(token, get_secret_key(), algorithms=[get_algorithm()])


def get_token_expiration_delta() -> timedelta:
    return timedelta(minutes=get_access_token_expiry_minutes())
