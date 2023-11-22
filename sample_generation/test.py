from sample_generation import create_pair, time_periods

from datetime import datetime


def main():

    usd_rub = create_pair(
        "USDRUB",
        (datetime(2011, 1, 1), datetime(2021, 1, 1)),
        time_periods["H4"],
        60,
        120
    )

    eur_rub = create_pair(
        "EURRUB",
        (datetime(2012, 4, 15, 12, 4), datetime(2021, 1, 1)),
        time_periods["M15"],
        70,
        130
    )

    print()


if __name__ == "__main__":
    main()
