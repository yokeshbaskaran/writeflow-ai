# main.py file
from fastapi import FastAPI
from fastapi import Depends
from routes.auth_routes import router as auth_router
from dependencies.auth_dependency import get_current_user

# creating app
app = FastAPI()

# add/include the routes from other folders
app.include_router(auth_router)


@app.get("/")
def test():
    return {"message": "Hi from main.py testing!!!"}


@app.get("/profile")
def profile(current_user=Depends(get_current_user)):
    return current_user
