import pymongo

# устанавливаем соединение с MongoDB
db_client = pymongo.MongoClient("mongodb://localhost:27017/")

# подключаемся к БД Forex (если она не создана, то создастся)
current_db = db_client["Forex"]

# получаем колекцию из нашей БД, ес
collection = current_db["pair"]


pipeline = [
    {"$match": {"name": "EURRUB"}},
    {"$unwind": "$values"},
    { "$group": {
        "_id": {
          "year": { "$year": "$values.timestamp" },
          "dayOfYear": { "$dayOfYear": "$values.timestamp" },
          "hour": { "$hour": "$values.timestamp" },
          "interval": {
            "$subtract": [
              { "$minute": "$values.timestamp" },
              { "$mod": [{ "$minute": "$values.timestamp"}, 15] }
            ]
          }
        },
        "count": { "$sum": 1 }
    },
    }
]

result = list(collection.aggregate(pipeline))

print(result)