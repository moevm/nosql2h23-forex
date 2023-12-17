from ..sample_generation import create_pair, time_periods
from .db_connection import db_init, check_db, check_collection, db_collection

from datetime import datetime

import numpy as np


def db_validate() -> bool:

    return check_db() and check_collection()


def create_db() -> None:

    pairs_collection = db_collection()

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
