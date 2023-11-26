from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from utils import db_init, db_validate, pairs_collection, queries

from pymongo.errors import DocumentTooLarge


# Create your views here.


def index(request) -> JsonResponse:

    if db_validate():

        return JsonResponse(
            {"DB is up": True,
             "Generated": False}
        )

    try:
        db_init()

        return JsonResponse(
            {"DB is up": True,
             "Generated": True}
        )

    except DocumentTooLarge:

        return JsonResponse(
            {"DB is up": False,
             "Generated": False}
        )


@require_http_methods(["GET"])
def get_discretization_periods(request: HttpRequest) -> JsonResponse:

    return JsonResponse(
        queries["periods"]()
    )

@require_http_methods(["GET"])
def get_pair_info(request: HttpRequest, pair_name: str) -> JsonResponse:

    return JsonResponse(
        queries["info"](pairs_collection, pair_name)
    )


@require_http_methods(["GET"])
def get_pair_summary(request: HttpRequest, pair_name: str) -> JsonResponse:

    return JsonResponse(
        queries["summary"](pairs_collection, pair_name),
        safe=False  # Needed to send List of one object as JsonResponse.
    )


@require_http_methods(["GET"])
def get_point_info(
        request: HttpRequest,
        pair_name: str,
        year: int,
        month: int = 1,
        day: int = 1,
        hour: int = 0,
        minute: int = 0
) -> JsonResponse:

    return JsonResponse(
        queries["point"](pairs_collection, pair_name, [year, month, day, hour, minute])
    )
