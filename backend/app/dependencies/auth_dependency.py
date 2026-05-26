from jose import jwt, JWTError
from fastapi import Header
from config import SECRET_KEY, ALGORITHM
from fastapi import HTTPException
from db.database import users_collection


# checks current user is authorized
def get_current_user(authorization: str = Header(...)):
    try:
        token = authorization.replace("Bearer ", "")

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        email = payload.get("sub")

        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = users_collection.find_one({"email": email}, {"password": 0})

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user["_id"] = str(user["_id"])

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
