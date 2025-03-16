from sqlalchemy import Column, Integer, String
from src.config.db import Base
from pydantic import BaseModel

class Inventario(Base):
    __tablename__ = "inventario"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)
    cantidad = Column(Integer, nullable=False, default=0)
    estado = Column(String, nullable=False, default="disponible")


class InventarioSchema(BaseModel):
    nombre: str
    descripcion: str
    cantidad: int
