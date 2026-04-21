from django.contrib import admin
from django.urls import path, include
from core import views 
from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')),
]

urlpatterns += i18n_patterns(
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('portfolio/', views.portfolio, name='portfolio'),
    path('settings/', views.settings, name='settings'),
    path('team/', views.team, name='team'),
)
