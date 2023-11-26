from django.urls import path

from . import views


urlpatterns = [
    path("", views.index),
    path("codes/", views.get_currency_pair_codes),
    path("show/<str:pair_name>", views.get_pair_info),
    path("periods/", views.get_discretization_periods),
    path("archive/<str:pair_name>", views.get_pair_summary),
    path("point/<str:pair_name>/<int:year>", views.get_point_info),
    path("point/<str:pair_name>/<int:year>/<int:month>", views.get_point_info),
    path("point/<str:pair_name>/<int:year>/<int:month>/<int:day>", views.get_point_info),
    path("point/<str:pair_name>/<int:year>/<int:month>/<int:day>/<int:hour>", views.get_point_info),
    path("point/<str:pair_name>/<int:year>/<int:month>/<int:day>/<int:hour>/<int:minute>", views.get_point_info),
]
