# main.py file
from fastapi import FastAPI
from routes.auth_routes import router as auth_router
from routes.user_routes import router as user_router
from fastapi.middleware.cors import CORSMiddleware

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
app.include_router(auth_router)  # authentication
app.include_router(user_router)  # user routes


@app.get("/")
def test():
    return {"message": "Hi from main.py testing!!!"}
