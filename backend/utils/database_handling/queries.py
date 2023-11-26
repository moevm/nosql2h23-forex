from pymongo.collection import Collection

from ..sample_generation import time_periods

from typing import Dict, List
from datetime import datetime


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


queries = {
    "codes": get_codes,
    "periods": get_periods,
    "info": get_info,
    "summary": get_summary,
    "point": get_point
}
