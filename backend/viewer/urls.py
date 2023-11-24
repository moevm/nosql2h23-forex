from django.urls import path

from . import views


urlpatterns = [
    path("", views.index),
    path("sample/", views.add_sample),
    path("show/", views.show_all)
]
