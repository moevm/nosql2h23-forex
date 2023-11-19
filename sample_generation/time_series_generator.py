import pandas as pd


def create_dates(start: str, end: str, period: str) -> pd.DatetimeIndex:

    return pd.date_range(start, end=end, freq=period)




print(create_dates("1/1/2019", "1/1/2020", "1M"))

