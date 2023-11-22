from pymongo import MongoClient


connection_url = "mongodb://localhost:27017"

client = MongoClient(connection_url)

database = client["Forex"]