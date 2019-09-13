from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello world. I'm the TIL application home page.")
