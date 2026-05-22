# Connect MongoDB
from pymongo import MongoClient

API_URL = "mongodb://localhost:27017"

client = MongoClient(API_URL)

# naming database name
db = client["writeflow_db"]

# users model
users_collection = db["users"]
