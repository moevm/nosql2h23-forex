from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from .models import pairs_collection


from utils import queries

# Create your views here.


def index(request) -> JsonResponse:
    return JsonResponse("<h1> App is a go! </h1>")


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
