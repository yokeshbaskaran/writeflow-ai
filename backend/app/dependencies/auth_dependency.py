from jose import jwt
from fastapi import Header
from config import SECRET_KEY, ALGORITHM


def get_current_user(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")

    payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)

    # print("payload:::", payload)

    return payload
