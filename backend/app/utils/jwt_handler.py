from jose import jwt
from datetime import datetime, timedelta
from config import SECRET_KEY, ALGORITHM


def create_token(email: str):

    payload = {"sub": email, "exp": datetime.utcnow() + timedelta(days=1)}

    # print("payload:::", payload)

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
