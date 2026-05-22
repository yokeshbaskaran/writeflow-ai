from dotenv import load_dotenv
import os

# loads all env
load_dotenv()

API_URL = os.getenv("MONGO_DB_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
