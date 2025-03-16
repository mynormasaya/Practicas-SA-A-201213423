from fastapi import FastAPI
from src.config.db import engine, Base
from src.routes.inventarioRoutes import router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)

@app.get("/")
def read_root():
    return {"servicio": "Inventario", "estado": "Activo"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3004)
