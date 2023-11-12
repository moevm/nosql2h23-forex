import pymongo

# устанавливаем соединение с MongoDB
db_client = pymongo.MongoClient("mongodb://localhost:27017/")

# подключаемся к БД Forex (если она не создана, то создастся)
current_db = db_client["Forex"]

# получаем колекцию из нашей БД, если её нет, то будет создана
collection = current_db["pair"]

usdrub = {
        "name": "USDRUB",
        "currency": "USD",
        "toExchange": "RUB",
        "first_obtained": "1989-12-21T00:00:00.000Z",
        "last_obtained": "2029-12-21T00:00:00.000Z",
        "import_date": "2019-12-21T00:00:00.000Z",
        "values": [
            {
                "timestamp": "2019-10-21T00:00:00.000Z",
                "open": 90,
                "close": 100,
                "min": 80,
                "max": 100
            },
            {
                "timestamp": "2019-11-21T00:00:00.000Z",
                "open": 90,
                "close": 100,
                "min": 80,
                "max": 100
            },
            {
                "timestamp": "2019-12-21T00:00:00.000Z",
                "open": 90,
                "close": 100,
                "min": 80,
                "max": 100
            }
        ]
    }

eurrub = {
        "name": "EURRUB",
        "currency": "EUR",
        "toExchange": "RUB",
        "first_obtained": "1989-12-21T00:00:00.000Z",
        "last_obtained": "2029-12-21T00:00:00.000Z",
        "import_date": "2019-12-21T00:00:00.000Z",
        "values": [
            {
                "timestamp": "2019-12-21T00:00:00.000Z",
                "open": 190,
                "close": 100,
                "min": 180,
                "max": 200
            },
            {
                "timestamp": "2019-12-22T00:00:00.000Z",
                "open": 190,
                "close": 100,
                "min": 180,
                "max": 200
            },
            {
                "timestamp": "2019-12-23T00:00:00.000Z",
                "open": 190,
                "close": 100,
                "min": 180,
                "max": 200
            }
        ]
    }

# ins_result = collection.insert_one(usdrub)  # добавляет одну запись в коллекцию collection
# ins_1_result = collection.insert_one(eurrub)  # добавляет одну запись в коллекцию collection

ins_res = collection.update_one({"name": "EURRUB"},
                                {"$push": {"values": {
                                                    "timestamp": "2019-12-24T00:16:00.000Z",
                                                    "open": 196,
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
