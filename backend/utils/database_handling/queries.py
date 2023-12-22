from pymongo.collection import Collection

from ..sample_generation import time_periods
from .db_connection import DB, db_init

from typing import Dict, List
from datetime import datetime, timedelta


period_deltas = {
    "M1": timedelta(minutes=1),
    "M5": timedelta(minutes=5),
    "M15": timedelta(minutes=15),
    "M30": timedelta(minutes=30),
    "H1": timedelta(hours=1),
    "H4": timedelta(hours=4),
    "D1": timedelta(days=1),
    "W1": timedelta(weeks=1),
    "MN1": timedelta(weeks=4)
}


def get_codes(source: Collection) -> Dict[str, List[str]]:

    pipeline = [
        {"$unwind": "$code"},
        {"$group": {"_id": "$code"}
         }
    ]

    return {"available": list(source.aggregate(pipeline))}


def get_periods() -> Dict[str, List[str]]:

    return {"available": list(time_periods.keys())}


def get_info(source: Collection, name_code: str) -> Dict[str, str | datetime]:

    return source.find_one({"code": name_code}, {"_id": 0})


def get_summary(source: Collection, name_code: str) -> List[Dict[str, str | datetime | int]]:

    pipeline = [
        {"$match": {"code": name_code}},
        {"$unwind": "$values"},
        {"$group": {
            "_id": 0,
            "code": {"$first": "$code"},
            "fromExchange": {"$first": "$fromExchange"},
            "toExchange": {"$first": "$toExchange"},
            "import_date": {"$first": "$import_date"},
            "exchange_rate_records": {"$sum": 1},
            "first_record_date": {"$first": "$first_record_date"},
            "last_record_date": {"$first": "$last_record_date"}
        }}
    ]

    # collection.aggregate returns a cursor object which is not Json-serializable. There seems to be no optimal way to
    # transform Cursor to Dict, so the function returns a list of exactly one object as a workaround.
    return list(source.aggregate(pipeline))


def get_point(source: Collection, name_code: str, timestamp: List[int]) -> Dict[str, str | float]:

    return source.find_one(
        {
            "code": name_code,
            "values.timestamp": datetime(*timestamp)
        },
        {"_id": 0, "values.$": 1}
    )


def get_graph_data(source: Collection,
                   name_code: str,
                   start: str,
                   end: str,
                   frequency: str
                   ) -> List[Dict[str, datetime | float]]:

    mod_delta = period_deltas[frequency]

    # Doesn't work as intended with 'W1' and 'MN1', frequencies. For some reason query result includes first element
    # with timestamp dating before the [start, end] time period.
    # TODO: look into that. Possibly replace timedelta, with relativedelta.
    pipeline = [
        {"$match": {"code": name_code}},
        {"$unwind": "$values"},
        {"$match": {
            "$expr": {
                "$and": [
                    {"$gt": ["$values.timestamp", datetime.strptime(start, "%Y-%m-%dT%H:%M:%S")]},
                    {"$lt": ["$values.timestamp", datetime.strptime(end, "%Y-%m-%dT%H:%M:%S")]}
                ]
            }
        }},
        {
            "$group": {
                "_id": {
                    "$toDate": {
                        "$subtract": [
                            {"$toLong": "$values.timestamp"},
                            {"$mod": [{"$toLong": "$values.timestamp"}, 1000 * mod_delta.total_seconds()]}
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

    return list(source.aggregate(pipeline))


def get_db() -> Dict[str, Dict[str, datetime | float]]:

    pair = DB.get_collection_name()

    return {pair: list(DB.collection.find({}, {"_id": 0}))}


def set_db(data: List[Dict[str, datetime | float]]) -> None:

    DB.drop()
    db_init()

    for pair in data[DB.get_collection_name()]:

        DB.collection.insert_one(
            pair
        )


queries = {
    "codes": get_codes,
    "periods": get_periods,
    "info": get_info,
    "summary": get_summary,
    "point": get_point,
    "graph": get_graph_data,
    "export": get_db,
    "import": set_db
}
