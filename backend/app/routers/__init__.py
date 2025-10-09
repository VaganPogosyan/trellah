"""API routers."""

from .auth import router as auth_router
from .boards import router as boards_router

__all__ = ("auth_router", "boards_router")
