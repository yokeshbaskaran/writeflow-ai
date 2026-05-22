# 1. Create Signup API
from fastapi import APIRouter
from schemas.auth_schema import SignupRequest, LoginRequest
from utils.hash import hash_pwd, verify_pwd
from db.database import users_collection

# router creating
router = APIRouter()
