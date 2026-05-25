# Connect MongoDB
from pymongo import MongoClient
import os

API_URL = os.getenv("MONGO_DB_URL")


client = MongoClient(API_URL)

# naming database name
db = client["writeflow_db"]

# users collections
users_collection = db["users"]
contents_collection = db["contents"]
