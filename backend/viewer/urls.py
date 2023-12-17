from django.urls import path, re_path

from . import views


date_capture = r'([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})'


urlpatterns = [
    path("", views.index),
    path("codes/", views.get_currency_pair_codes),
    path("show/<str:pair_name>/", views.get_pair_info),
    path("periods/", views.get_discretization_periods),
    path("archive/<str:pair_name>/", views.get_pair_summary),
    path("point/<str:pair_name>/<int:year>/", views.get_point_info),
    path("point/<str:pair_name>/<int:year>/<int:month>/", views.get_point_info),
    path("point/<str:pair_name>/<int:year>/<int:month>/<int:day>/", views.get_point_info),
    path("point/<str:pair_name>/<int:year>/<int:month>/<int:day>/<int:hour>/", views.get_point_info),
    path("point/<str:pair_name>/<int:year>/<int:month>/<int:day>/<int:hour>/<int:minute>/", views.get_point_info),

    re_path(r"^graph/(?P<pair_name>([A-Z]){6})/(?P<start_date>" + date_capture + r")/" +
            r"(?P<end_date>" + date_capture + r")/(?P<frequency>[A-Za-z]{1,2}[0-9]{1,2})/$",
            views.build_graph),

    path("export/", views.export),
    path("import/", views.import_db)
]
