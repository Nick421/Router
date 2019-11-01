from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^api/public$", views.public, name="public"),
    url(r"^api/login$", views.login, name="login"),
    url(r"^api/private_history$", views.private_history, name="private_history"),
    url(r"^api/private_favourite$", views.private_favourite, name="private_fav")
]
