from jose import jwt, JWTError
from fastapi import Header
from config import SECRET_KEY, ALGORITHM
from fastapi import HTTPException


# checks current user is authorized
def get_current_user(authorization: str = Header(...)):

    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)

        # print("payload:::", payload)
        return payload
    #
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
