import pymongo

# устанавливаем соединение с MongoDB
db_client = pymongo.MongoClient("mongodb://localhost:27017/")

# подключаемся к БД Forex (если она не создана, то создастся)
current_db = db_client["Forex"]

# получаем колекцию из нашей БД, если её нет, то будет создана
collection = current_db["pair"]

usd = {
    'timestamp': 0,
    'name': 'USD',
    'to': 'RUB',
    'exchange': 100,
}

ins_result = collection.insert_one(usd)  # добавляет одну запись в коллекцию collection

# вывести все документы в коллекции
for channel in collection.find():
    print(channel)

# удаление коллекции
collection.drop()
# удаление бд
db_client.drop_database('Forex')
