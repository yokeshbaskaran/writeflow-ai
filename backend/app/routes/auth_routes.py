# 1. Create Signup API
from fastapi import APIRouter
from schemas.auth_schema import SignupRequest, LoginRequest
from utils.hash import hash_pwd, verify_pwd
from db.database import users_collection

# router creating
router = APIRouter()


@router.post("/login")
def login(data: LoginRequest):
    print("Login request!")

    findUser = users_collection.find_one({"email": data.email})

    if not findUser:
        return {"message": "Invalid credentials"}

    is_valid_pwsd = verify_pwd(data.password, findUser["password"])

    if not is_valid_pwsd:
        return {"message": "Invalid credential"}

    return {"msg": "User logined!"}


@router.post("/signup")
def signup(data: SignupRequest):
    print("Signup request!")

    # checks existing_user
    existing_user = users_collection.find_one({"email": data.email})

    # if existing_user already exists returns msg
    if existing_user:
        return {"message": "Account Already exists"}

    # creating user

    user = {"name": data.name, "email": data.email, "password": hash_pwd(data.password)}

    users_collection.insert_one(user)

    return {"message": "User created"}
