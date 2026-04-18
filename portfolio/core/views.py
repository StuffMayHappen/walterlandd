from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def portfolio(request):
    return render(request, 'portfolio.html')

def settings(request):
    return render(request, 'settings.html')

def team(request):
    return render(request, 'team.html')

