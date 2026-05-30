# main.py file
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_routes import router as auth_router
from app.routes.user_routes import router as user_router
from app.config import FRONT_END_URL

# creating app
app = FastAPI()

print("LIVE_PAGE_URL:", FRONT_END_URL)

# CORS
origins = [
    FRONT_END_URL,
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
app.include_router(auth_router)  # authentication
app.include_router(user_router)  # user routes


@app.get("/")
def test():
    return {"message": "Hi from main.py testing!!!"}
