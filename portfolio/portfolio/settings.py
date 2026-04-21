from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-^8mfzbfwt36tuv2ulhkjf8*x)%gxf56&)phs^cdrr#g^2#p%t!'

DEBUG = True

ALLOWED_HOSTS = []


#========================
# Application definition
#========================
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio.wsgi.application'


#==========
# Database
#==========

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


#=====================
# Password validation
#=====================

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


#======================
# Internationalization
#======================
from django.utils.translation import gettext_lazy as _

LANGUAGE_CODE = 'pt'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

LANGUAGES = [
    ('pt', _('Português')),
    ('en', _('English')),
    ('es', _('Español')),
    ('fr', _('Français')),
    ('ja', _('日本語')),
    ('tr', _('Türkçe')),
    ('zh-hant', _('繁體中文')),
    ('de', _('Deutsch')),
    ('ru', _('Русский')),
    ('uk', _('Українська')),
    ('ur', _('اردو')),
    ('ar', _('العربية')),
    ('ko', _('한국어')),
    ('hi', _('हिन्दी')),
    ('it', _('Italiano')),
]

LOCALE_PATHS = [
    BASE_DIR / 'locale',
]


#==============
# Static files
#==============

STATIC_URL = 'static/'

STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# --- CONFIGURAÇÃO DE EMAIL (SMTP GMAIL) ---
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 465
EMAIL_USE_TLS = False
EMAIL_USE_SSL = True
EMAIL_HOST_USER = 'walter.santos.dev@gmail.com'
EMAIL_HOST_PASSWORD = 'gnefswyaxidiqfif'

