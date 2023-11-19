import pymongo

from datetime import datetime

# устанавливаем соединение с MongoDB
db_client = pymongo.MongoClient("mongodb://localhost:27017/")

# подключаемся к БД Forex (если она не создана, то создастся)
current_db = db_client["Forex"]

# получаем колекцию из нашей БД, если её нет, то будет создана
collection = current_db["pair"]

eurrub = {
        "name": "EURRUB",
        "currency": "EUR",
        "toExchange": "RUB",
        "first_obtained": datetime(1989, 12, 21, 0, 0, 0),
        "last_obtained": datetime(2019, 12, 21, 0, 0, 0),
        "import_date": datetime(2019, 12, 21, 0, 0, 0),
        "values": [
            {
                "timestamp": datetime(2019, 12, 21, 0, 0, 0),
                "open": 190,
                "close": 100,
                "min": 180,
                "max": 200
            },
            {
                "timestamp": datetime(2019, 12, 21, 0, 1, 0),
                "open": 150,
                "close": 98,
                "min": 88,
                "max": 161
            },
            {
                "timestamp": datetime(2019, 12, 21, 0, 2, 0),
                "open": 164,
                "close": 167,
                "min": 140,
                "max": 167
            }
        ]
    }

ins_1_result = collection.insert_one(eurrub)  # добавляет одну запись в коллекцию collection

ins_res = collection.update_one({"name": "EURRUB"},
                                {"$push": {"values": {
                                                    "timestamp": datetime(2019, 12, 21, 0, 3, 0),
                                                    "open": 130,
                                                    "close": 120,
                                                    "min": 101,
                                                    "max": 199
                                                 }
                                        }
                                       }
                                )

# вывести все документы в коллекции
for channel in collection.find():
    print(channel)

# # удаление коллекции
# collection.drop()
# # удаление бд
# db_client.drop_database('Forex')
