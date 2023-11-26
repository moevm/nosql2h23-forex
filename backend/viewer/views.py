from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from utils import create_db, db_validate, db_collection, queries

from pymongo.errors import DocumentTooLarge


# Create your views here.


def index(request) -> JsonResponse:

    if db_validate():

        return JsonResponse(
            {"DB is up": True,
             "Generated": False}
        )

    try:
        create_db()

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
        queries["info"](db_collection(), pair_name)
    )


@require_http_methods(["GET"])
def get_pair_summary(request: HttpRequest, pair_name: str) -> JsonResponse:

    return JsonResponse(
        queries["summary"](db_collection(), pair_name),
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
        queries["point"](db_collection(), pair_name, [year, month, day, hour, minute])
    )
