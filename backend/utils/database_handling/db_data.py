from ..sample_generation import create_pair, time_periods
from .db_connection import database, collection_name, pairs_collection

from datetime import datetime
from pymongo.errors import CollectionInvalid

import numpy as np


def db_validate() -> bool:

    try:
        database.validate_collection(collection_name)

        return True

    except CollectionInvalid:

        return False


def db_init() -> None:

    pairs = {
        "USDRUB": (datetime(2010, 1, 1), datetime(2010, 4, 1)),
    }

    const_frequency = time_periods["M1"]

    for pair in pairs:

        low = np.random.randint(20, 200)
        high = np.random.randint(low + 1, 250)

        pairs_collection.insert_one(
            create_pair(
                pair,
                pairs[pair],
                const_frequency,
                low,
                high
            )
        )
