from django.shortcuts import render
from django.http import HttpResponse

from .models import pairs_collection

from datetime import datetime

from utils import create_pair, time_periods

# Create your views here.


def index(request) -> HttpResponse:
    return HttpResponse("<h1> App is a go! </h1>")


def add_sample(request) -> HttpResponse:

    pairs_collection.insert_one(
        create_pair(
            "USDRUB",
            (datetime(2011, 1, 1), datetime(2021, 1, 1)),
            time_periods["H4"],
            60,
            120
        )
    )

    return HttpResponse("Currency pair 'USDRUB' added!")


def show_all(request) -> HttpResponse:

    return HttpResponse(pairs_collection.find())
