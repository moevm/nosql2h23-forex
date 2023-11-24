from pymongo.cursor import Cursor
from pymongo.collection import Collection


from typing import Dict, List
from datetime import datetime


def serialise_cursor(data: Cursor) -> List[Dict[str, str | datetime | List[Dict[str, datetime | float]]]]:

    serialized = list(data)

    return serialized


def get_info(source: Collection, name_code: str) -> Dict[str, str | datetime]:

    return source.find_one({"pair_name": name_code}, {"_id": 0})
