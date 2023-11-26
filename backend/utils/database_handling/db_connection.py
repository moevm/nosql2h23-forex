from pymongo import MongoClient
from pymongo.collection import Collection


class DB:

    _connection_url = "mongodb://localhost:27017"

    _db_name = "Forex"

    _collection_name = "Currency_pairs"

    # ---------------------------------------------

    client = MongoClient(_connection_url)

    database = client[_db_name]

    collection = database[_collection_name]

    @staticmethod
    def get_connection_name() -> str:

        return DB._connection_url

    @staticmethod
    def get_db_name() -> str:

        return DB._db_name

    @staticmethod
    def get_collection_name() -> str:

        return DB._collection_name


def db_init() -> None:

    DB.client = MongoClient(DB.get_connection_name())
    DB.database = DB.client[DB.get_db_name()]
    DB.collection = DB.database[DB.get_collection_name()]


def db_collection() -> Collection:

    return DB.collection


def check_db(name: str = DB.get_db_name()) -> bool:

    names = DB.client.list_database_names()

    if name in names:

        return True

    return False


def check_collection(name: str = DB.get_collection_name()) -> bool:

    names = DB.database.list_collection_names()

    if name in names:

        return True

    return False
