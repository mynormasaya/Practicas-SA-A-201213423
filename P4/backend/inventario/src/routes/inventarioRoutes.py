from fastapi import APIRouter
from src.controllers.inventarioController import router as inventario_router
from src.config.db import engine, Base


router = APIRouter()
router.include_router(inventario_router)
