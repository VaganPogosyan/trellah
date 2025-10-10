from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.board import Board, BoardColumn, BoardMember, Card
from app.models.user import User
from app.schemas.board import (
    BoardCreate,
    BoardMemberCreate,
    BoardMemberRead,
    BoardRead,
    CardCreate,
    CardRead,
    ColumnCreate,
    ColumnRead,
)
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/boards", tags=["boards"])


# Create Board
@router.post("", response_model=BoardRead, status_code=status.HTTP_201_CREATED)
def create_board(payload: BoardCreate, db: Session = Depends(get_db)) -> BoardRead:
    owner = db.get(User, payload.owner_id)
    if not owner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Owner not found."
        )

    board = Board(
        name=payload.name,
        description=payload.description,
        owner_id=payload.owner_id,
        image=payload.image,
    )
    db.add(board)
    db.flush()

    owner_membership = BoardMember(
        board_id=board.id,
        user_id=payload.owner_id,
        role="owner",
    )
    db.add(owner_membership)
    db.commit()
    db.refresh(board)

    return BoardRead.model_validate(board)


# Add Member to a Board
@router.post(
    "/{board_id}/members",
    response_model=BoardMemberRead,
    status_code=status.HTTP_201_CREATED,
)
def add_board_member(
    board_id: UUID, payload: BoardMemberCreate, db: Session = Depends(get_db)
) -> BoardMemberRead:
    board = db.get(Board, board_id)
    if not board:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Board not found."
        )

    user = db.get(User, payload.user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )

    existing = db.execute(
        select(BoardMember).where(
            BoardMember.board_id == board_id, BoardMember.user_id == payload.user_id
        )
    ).scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User is already a member of this board.",
        )

    membership = BoardMember(
        board_id=board_id,
        user_id=payload.user_id,
        role=payload.role or "member",
    )
    db.add(membership)
    db.commit()
    db.refresh(membership)
    return BoardMemberRead.model_validate(membership)


# Create Column
@router.post(
    "/{board_id}/columns",
    response_model=ColumnRead,
    status_code=status.HTTP_201_CREATED,
)
def create_column(
    board_id: UUID, payload: ColumnCreate, db: Session = Depends(get_db)
) -> ColumnRead:
    board = db.get(Board, board_id)
    if not board:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Board not found."
        )

    position = payload.position
    if position is None:
        next_position = db.execute(
            select(func.coalesce(func.max(BoardColumn.position), -1)).where(
                BoardColumn.board_id == board_id
            )
        ).scalar_one()
        position = (next_position or -1) + 1

    column = BoardColumn(board_id=board_id, title=payload.title, position=position)
    db.add(column)
    db.commit()
    db.refresh(column)
    return ColumnRead.model_validate(column)


# Create Card
@router.post(
    "/columns/{column_id}/cards",
    response_model=CardRead,
    status_code=status.HTTP_201_CREATED,
)
def create_card(
    column_id: UUID, payload: CardCreate, db: Session = Depends(get_db)
) -> CardRead:
    column = db.get(BoardColumn, column_id)
    if not column:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Column not found."
        )

    position = payload.position
    if position is None:
        next_position = db.execute(
            select(func.coalesce(func.max(Card.position), -1)).where(
                Card.column_id == column_id
            )
        ).scalar_one()
        position = (next_position or -1) + 1

    card = Card(
        column_id=column_id,
        title=payload.title,
        description=payload.description,
        position=position,
    )
    db.add(card)
    db.commit()
    db.refresh(card)
    return CardRead.model_validate(card)


# Get all Boards owned by the user
@router.get(
    "",
    response_model=list[BoardRead],
    status_code=status.HTTP_200_OK,
)
def list_owned_boards(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[BoardRead]:
    boards = db.execute(
        select(Board)
        .where(Board.owner_id == current_user.id)
        .order_by(Board.created_at)
    ).scalars()
    return [BoardRead.model_validate(board) for board in boards]


@router.get(
    "/{board_id}",
    response_model=BoardRead,
    status_code=status.HTTP_200_OK,
)
def get_board_by_id(
    board_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> BoardRead:
    board = db.execute(
        select(Board).where(Board.id == board_id, Board.owner_id == current_user.id)
    ).scalar_one_or_none()

    if not board:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Board not found.",
        )

    return BoardRead.model_validate(board)
