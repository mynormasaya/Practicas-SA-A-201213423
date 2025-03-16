from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.db import SessionLocal
from src.models.inventarioModel import Inventario, InventarioSchema

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/inventario")
def crear_item(item: InventarioSchema, db: Session = Depends(get_db)):  # Ahora recibe un esquema Pydantic
    nuevo_item = Inventario(nombre=item.nombre, descripcion=item.descripcion, cantidad=item.cantidad)
    db.add(nuevo_item)
    db.commit()
    db.refresh(nuevo_item)
    return {"mensaje": "Item agregado exitosamente", "item": nuevo_item}
@router.get("/inventario")
def obtener_items(db: Session = Depends(get_db)):
    return db.query(Inventario).all()
