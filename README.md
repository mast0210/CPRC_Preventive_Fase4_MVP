# CPRC Preventive — Fase 4, Proyecto de grado UNAD

**Proyecto:** Conocimiento, percepción de riesgo y conductas preventivas frente al phishing e ingeniería social potenciada por IA en ciudadanos de Bogotá D. C. — CPRC Preventive.

**Autoría y tutor:** consignados en el documento maestro que se entrega en el aula, por separado del repositorio de código.

## Importante: estado verificable

Esta entrega contiene **código fuente** para un prototipo React + TypeScript y una API Django REST Framework, configuración PostgreSQL opcional y una **demostración autónoma** sin dependencias en `demo-sin-instalacion/`.

En el entorno donde se creó este paquete solo se pudieron verificar la **sintaxis del backend**, el **JavaScript de la demostración** y pruebas estáticas de estructura. La instalación npm/pip y la ejecución integrada React + Django **no se completaron** aquí por falta de acceso al registro de paquetes. **Deben ejecutarse y probarse en el equipo del grupo** y adjuntar pruebas reales antes de afirmar cumplimiento de TRL 5. El prototipo no demuestra reducción de ciberdelitos ni sustituye la investigación DEXPLIS.

## 1. Prueba inmediata — sin instalar nada

1. Descomprime el archivo `.zip`.
2. Abre la carpeta `demo-sin-instalacion`.
3. Haz doble clic en `index.html`. Se abrirá en Chrome, Edge u otro navegador.
4. Prueba **Inicio → Aprender → Practicar → Recursos**. Contesta cinco preguntas y comprueba la retroalimentación. Marca un módulo como leído y recarga la pestaña.
5. Esta versión es una **demostración offline**. No usa Django ni PostgreSQL, no debe presentarse como validación integrada ni como TRL 5 por sí sola.

## 2. Requisitos para ejecutar la solución React + Django

- Windows 10/11; Python **3.11 o superior**; Node.js **22.12 o superior** (para Vite 7).
- Acceso a Internet la primera vez para descargar dependencias.
- Un editor de texto como Visual Studio Code es conveniente, pero no obligatorio.
- PostgreSQL 16 es opcional en la prueba local; para evidenciar la arquitectura indicada en el marco tecnológico, configurarlo antes de grabar el video si el grupo decide mantenerlo en la versión final.

### Backend (API) — PowerShell

Abre la carpeta `backend` en el Explorador. En la barra de direcciones escribe `powershell` y presiona Enter. Ejecuta, **una orden por vez**:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py seed_content
.\.venv\Scripts\python.exe manage.py test
.\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

Mantén esa ventana abierta. Comprueba en Chrome:

- http://127.0.0.1:8000/api/health/
- http://127.0.0.1:8000/api/modules/
- http://127.0.0.1:8000/api/quiz/

El servidor usa SQLite **solo como alternativa de desarrollo local** cuando no hay variable `DATABASE_URL`.

### Frontend React — PowerShell en una SEGUNDA ventana

Abre la carpeta `frontend`, escribe `powershell` en la barra de direcciones y ejecuta:

```powershell
npm install
npm run dev
```

Abre la dirección que muestra Vite, normalmente **http://127.0.0.1:5173/**. La API debe estar encendida al mismo tiempo. Prueba los módulos, la práctica y los recursos.

Para compilar el frontend:

```powershell
npm run build
```

### PostgreSQL (alternativa si el grupo documenta esta tecnología)

Si tienes PostgreSQL instalado, crea una base `cprc` y usuario con contraseña local, o instala Docker Desktop y ejecuta desde la carpeta raíz:

```powershell
docker compose up -d db
```

Antes de arrancar Django, en **esa misma terminal del backend** configura la conexión de desarrollo:

```powershell
$env:DATABASE_URL = 'postgresql://cprc:cprc_local@127.0.0.1:5432/cprc'
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py seed_content
.\.venv\Scripts\python.exe manage.py test
.\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

> La contraseña publicada en `docker-compose.yml` es **solo para pruebas locales**. No subir una contraseña de producción. No desplegar este código directamente en Internet sin revisión de seguridad, autenticación, gestión de secretos, HTTPS y configuración de producción.

## 3. Estructura

```text
CPRC_Preventive_Fase4_MVP/
  backend/                 API Django + DRF, migraciones y test de endpoints
  frontend/                React + TypeScript y diseño adaptable
  demo-sin-instalacion/    HTML/CSS/JS para explorar sin instalar dependencias
  docs/                    Guía de instalación, GitHub, video y evidencia TRL (sin portada con datos personales)
  evidence/                Plantillas vacías para registrar PRUEBAS REALES
  tests/                   Comprobaciones estáticas disponibles sin paquetes
  docker-compose.yml      PostgreSQL de desarrollo en localhost
  .gitignore               Evita bases locales, entornos y dependencias
```

## 4. Flujo funcional principal

1. Inicio con propósito y acceso a módulos.
2. Aprender: tres módulos con contenido y puntos clave.
3. Practicar: cinco preguntas sin enlaces peligrosos. El cliente pide las preguntas sin las respuestas correctas.
4. Enviar a Django: el backend califica y devuelve explicaciones por pregunta.
5. Mostrar porcentaje y opción de reintentar.
6. Recursos oficiales en una sección separada.

**Privacidad:** no se solicitan nombre, correo, número de identidad, contraseñas ni códigos; las respuestas individuales de la evaluación no se guardan en la base de datos. La API guarda el puntaje agregado por intento sin identificador de usuario. Esto no convierte el prototipo en una aplicación de producción apta para gestionar datos personales.

## 5. Cómo validar y documentar

1. Ejecuta `python manage.py test` en el backend; pega resultados y fecha en `evidence/pruebas_funcionales.csv`.
2. Prueba desde navegador a resolución de escritorio y móvil; documenta versiones del navegador y fecha.
3. Pide a participantes adultos voluntarios del perfil objetivo (18–45 años en Bogotá) que hagan el recorrido con consentimiento y registra observaciones **sin nombres identificables** en `evidence/validacion_usuarios.csv`.
4. Anota defectos, correcciones y repetición de prueba. No rellenen los resultados como aprobados sin ejecutarlos.
5. Si el grupo consigue evidencias relevantes, relacionarlas con el argumento TRL5. La aceptación del nivel depende del tutor.
6. Actualiza el DOCX y pega los enlaces reales de GitHub y video donde se indica `[PENDIENTE]`.
7. Graba un video de **máximo 10 minutos**, con la cámara encendida de **todos** los integrantes durante **toda** la socialización.

## 6. GitHub

Lee `docs/GITHUB_DESDE_CERO.md` para publicar la carpeta **descomprimida**, no un ZIP dentro del repositorio. Un repositorio público de código sin datos personales permite al tutor leerlo sin permisos adicionales; revisa todos los archivos antes de publicar. Si optas por repositorio privado, verifica expresamente con el tutor el acceso; en repositorios de cuenta personal los colaboradores invitados pueden tener permiso de escritura, no debe presumirse un rol exclusivamente de lectura.

## 7. Límites académicos

- La encuesta de 385 respuestas y la muestra inicial de 453 contactos siguen siendo una **planificación**, no datos recogidos.
- El diagnóstico DEXPLIS no se sustituye por la práctica de cinco preguntas del software.
- La validación con usuarios, el video, el repositorio remoto y el nivel TRL 5 **no se han verificado** por la creación de estos archivos.
- Los contenidos de sensibilización son preliminares; se deben ajustar a las brechas reales identificadas y a la retroalimentación docente.
