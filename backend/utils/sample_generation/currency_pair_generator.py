from typing import Dict, Tuple, List

from datetime import datetime

import pandas as pd
import numpy as np


# Периоды дискретизации
time_periods = {
    "M1": "T",
    "M5": "5T",
    "M15": "15T",
    "M30": "30T",
    "H1": "H",
    "H4": "4H",
    "D1": "D",
    "W1": "W",
    "MN": "M"
}


# Генерация основных данных для валютной пары
def _create_header(name: str, period: Tuple[datetime, datetime]) -> Dict[str, str | datetime]:

    return {
        "pair_name": name,
        "currency": name[:3],
        "exchanged_to": name[3:],
        "first_data_obtained": period[0],
        "last_data_obtained": period[1],
        "import_date": datetime.now()
    }


# Генерация временного ряда курса валютной пары
def _create_time_series(period: Tuple[datetime, datetime],
                       frequency: str,
                       lowest: float,
                       peak: float) -> List[Dict[str, datetime | float]]:

    time_period = [t.to_pydatetime() for t in pd.date_range(period[0], end=period[1], freq=frequency)]

    open_value = np.random.uniform(low=lowest, high=peak)
    close_value = np.random.uniform(low=lowest, high=peak)
    max_value = np.random.uniform(low=max(open_value, close_value), high=peak)
    min_value = np.random.uniform(low=lowest, high=min(open_value, close_value))

    time_series = [
        {
            "timestamp": time_period[0],
            "open": round(open_value, 1),
            "close": round(close_value, 1),
            "min": round(min_value, 1),
            "max": round(max_value, 1)
        }
    ]

    for i in range(1, len(time_period)):

        time_series.append(
            {
                "timestamp": time_period[i],
                "open": time_series[i - 1]["close"],
                "close": round(np.random.uniform(low=lowest, high=peak), 1)
            }
        )

        time_series[i]["min"] = round(np.random.uniform(low=lowest, high=min(
            time_series[i]["open"], time_series[i]["close"]
        )), 1)

        time_series[i]["max"] = round(np.random.uniform(high=peak, low=max(
            time_series[i]["open"], time_series[i]["close"]
        )), 1)

    return time_series


# Генерация данных валютной пары
def create_pair(name: str,
                period: Tuple[datetime, datetime],
                frequency: str,
                lowest: float,
                peak: float
                ) -> Dict[str, str | datetime | List[Dict[str, datetime | float]]]:

    if len(name) != 6:
        raise ValueError(f"[{name}] with length of: {len(name)}, "
                         f"is an incorrect currency pair name! Should be 6 symbols long!")

    if period[0] >= period[1]:
        raise ValueError(f"Period: [{period[0]}, {period[1]}] is an invalid time interval. "
                         f"The start of the interval should date before the end of it!")

    if lowest >= peak:
        raise ValueError(
            f"[{lowest}, {peak}] is an incorrect interval. "
            f"Please make sure that the left border is lower that the right one!"
        )

    result = _create_header(name, period)
    result["values"] = _create_time_series(period, frequency, lowest, peak)

    return result
