# core/views.py

# 1. AS IMPORTAÇÕES (O equipamento necessário)
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib import messages

# 2. AS NOSSAS VIEWS
def home(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        email_cliente = request.POST.get('email')
        mensagem = request.POST.get('mensagem')

        assunto = f'NOVO CONTACTO [PORTFÓLIO]: {nome}'
        corpo = f'Vem do formulário da linha da frente.\n\nNome: {nome}\nEmail do Cliente: {email_cliente}\n\nO que ele disse:\n{mensagem}'

        try:
            send_mail(
                assunto,
                corpo,
                'walter.santos.dev@gmail.com', 
                ['walter.santos.dev@gmail.com'], 
                fail_silently=False,
            )
            messages.success(request, 'Mensagem disparada com sucesso! A equipa vai analisar.')
        except Exception as e:
            print(f"ERRO DE EMAIL DO GMAIL: {e}") 
            messages.error(request, 'Erro na distorção. O servidor de email bloqueou o sinal.')

        return redirect('home')

    return render(request, 'home.html')

def portfolio(request):
    return render(request, 'portfolio.html')

def settings(request):
    return render(request, 'settings.html')

def team(request):
    return render(request, 'team.html')
