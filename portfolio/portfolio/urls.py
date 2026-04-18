from django.contrib import admin
from django.urls import path
from core import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('portfolio/', views.portfolio, name='portfolio'),
    path('settings/', views.settings, name='settings'),
    path('team/', views.team, name='team'),
    
]
