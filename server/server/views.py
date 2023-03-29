from django.http import JsonResponse


def homeRoute(request):
    return JsonResponse({"Radhey": "Shyam" } ,safe=False)
    