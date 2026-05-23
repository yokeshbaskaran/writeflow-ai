# main.py file
from fastapi import FastAPI
from routes.auth_routes import router as auth_router
from dependencies.auth_dependency import get_current_user
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends

# creating app
app = FastAPI()

# CORS
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# add/include the routes from other folders
app.include_router(auth_router)


@app.get("/")
def test():
    return {"message": "Hi from main.py testing!!!"}


@app.get("/profile")
def profile(current_user=Depends(get_current_user)):
    return current_user
