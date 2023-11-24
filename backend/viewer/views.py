from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from .models import pairs_collection


from utils import get_info

# Create your views here.


def index(request) -> JsonResponse:
    return JsonResponse("<h1> App is a go! </h1>")


@require_http_methods(["GET"])
def get_pair_info(request: HttpRequest, pair_name: str) -> JsonResponse:

    return JsonResponse(
        get_info(pairs_collection, pair_name)
    )
