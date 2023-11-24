import pymongo

from datetime import datetime

# устанавливаем соединение с MongoDB
db_client = pymongo.MongoClient("mongodb://localhost:27017/")

# подключаемся к БД Forex (если она не создана, то создастся)
current_db = db_client["Forex"]

# получаем колекцию из нашей БД, ес
collection = current_db["pair"]


ins_res = collection.update_one({"name": "EURRUB"},
                                {"$push": {"values": {
                                                    "timestamp": datetime(2020, 11, 12, 1, 10, 20),
                                                    "open": 500,
                                                    "close": 15,
                                                    "min": 10,
                                                    "max": 1000
                                                 }
                                        }
                                       }
                                )


pipeline = [
    {"$match": {"name": "EURRUB"}},
    {"$unwind": "$values"},
    {"$match": {
        "$expr": {
            "$and": [
                {"$gt": ["$values.timestamp", datetime(2019, 12, 20, 0, 0, 0)]},
                {"$lt": ["$values.timestamp", datetime(2020, 11, 11, 0, 0, 0)]}
            ]
        }
    }},
    {
        "$group": {
            "_id": {
                "$toDate": {
                    "$subtract": [
                        {"$toLong": "$values.timestamp"},
                        {"$mod": [{"$toLong": "$values.timestamp"}, 1000 * 60 * 15]}  # Милисекунды в 15 минут
                    ]
                }
            },
            "open": {"$first": "$values.open"},
            "close": {"$last": "$values.close"},
            "min": {"$min": "$values.min"},
            "max": {"$max": "$values.max"}
        }
    },
    {"$sort": {"_id": 1}}
]

result = list(collection.aggregate(pipeline))
for data_point in result:
    print(data_point)

print()