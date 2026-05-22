# Password Hashing
from passlib.context import CryptContext

pwd_contents = CryptContext(schemes=["bcrypt"], deprecated="auto")


# hashing user password when creating
def hash_pwd(pwd: str):
    return pwd_contents.hash(pwd)


# verify hashed password from db paswd
def verify_pwd(plainPwd, hashedPwd):
    return pwd_contents.verify(plainPwd, hashedPwd)
