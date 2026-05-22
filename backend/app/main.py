# main.py file
from fastapi import FastAPI
from routes.auth_routes import router as auth_router

# creating app
app = FastAPI()

# add/include the routes from other folders
app.include_router(auth_router)


@app.get("/")
def test():
    return {"message": "Hi from main.py testing!!!"}
