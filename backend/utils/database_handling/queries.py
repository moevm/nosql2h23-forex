from pymongo.cursor import Cursor
from pymongo.collection import Collection


from typing import Dict, List
from datetime import datetime


def serialise_cursor(data: Cursor) -> List[Dict[str, str | datetime | List[Dict[str, datetime | float]]]]:

    serialized = list(data)

    return serialized


def get_info(source: Collection, name_code: str) -> Dict[str, str | datetime]:

    return source.find_one({"pair_name": name_code}, {"_id": 0})


def get_summary(source: Collection, name_code: str) -> List[Dict[str, str | datetime | int]]:

    pipeline = [
        {"$match": {"pair_name": name_code}},
        {"$unwind": "$values"},
        {"$group": {
            "_id": 0,
            "code": {"$first": "$pair_name"},
            "currency": {"$first": "$currency"},
            "exchanged_to": {"$first": "$exchanged_to"},
            "import_date": {"$first": "$import_date"},
            "exchange_rate_records": {"$sum": 1},
            "first_record": {"$first": "$first_data_obtained"},
            "last_record": {"$first": "$last_data_obtained"}
        }}
    ]

    # collection.aggregate returns a cursor object which is not Json-serializable. There seems to be no optimal way to
    # transform Cursor to Dict, so the function returns a list of exactly one object as a workaround.
    return list(source.aggregate(pipeline))


queries = {
    "info": get_info,
    "summary": get_summary
}
