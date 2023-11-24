from django.urls import path

from . import views


urlpatterns = [
    path("", views.index),
    path("show/<str:pair_name>", views.get_pair_info)
]
