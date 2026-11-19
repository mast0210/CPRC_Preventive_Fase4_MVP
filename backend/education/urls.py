from django.urls import path
from . import views
urlpatterns = [
    path('health/', views.health),
    path('modules/', views.modules),
    path('modules/<slug:slug>/', views.module_detail),
    path('quiz/', views.quiz),
    path('quiz/grade/', views.grade_quiz),
]
