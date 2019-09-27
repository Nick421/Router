from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^api/public$", views.public),
    url(r"^api/login$", views.login),
    url(r"^api/private_history$", views.private_history),
    url(r"^api/private_favourite$", views.private_favourite)
]
