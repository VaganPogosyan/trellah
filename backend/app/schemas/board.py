from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field
from pydantic.types import UUID4


class BoardCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=2000)
    owner_id: UUID4
    image: str | None = Field(default=None, max_length=255)


class BoardRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID4
    name: str
    description: str | None
    owner_id: UUID4
    image: str | None
    created_at: datetime


class BoardMemberCreate(BaseModel):
    user_id: UUID4
    role: Literal["owner", "admin", "member"] | None = None


class BoardMemberRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    board_id: UUID4
    user_id: UUID4
    role: str
    joined_at: datetime


class ColumnCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    position: int | None = None


class ColumnRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID4
    board_id: UUID4
    title: str
    position: int
    created_at: datetime


class CardCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=4000)
    position: int | None = None


class CardRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID4
    column_id: UUID4
    title: str
    description: str | None
    position: int
    created_at: datetime
