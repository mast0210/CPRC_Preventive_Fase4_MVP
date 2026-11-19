# Cómo subir CPRC Preventive a GitHub — instrucciones para principiantes (Windows)

## Antes de empezar

- Descarga y descomprime el paquete completo; por ejemplo, en `Documentos\CPRC_Preventive_Fase4_MVP`.
- Comprueba que dentro existen las carpetas `backend`, `frontend`, `demo-sin-instalacion`, `docs`, `evidence`.
- **No subas** los archivos `.env` con claves privadas, `db.sqlite3`, carpetas `node_modules` o `.venv`, ni el documento maestro con los nombres de los estudiantes si vas a publicar el repositorio. Ya se proporciona `.gitignore`.
- Abre una cuenta en https://github.com/ si no la tienes y verifica tu correo.

## Ruta recomendada: GitHub Desktop, sin comandos Git

1. Entra en https://desktop.github.com/ y descarga GitHub Desktop para Windows.
2. Instálalo, ábrelo y selecciona **Sign in to GitHub.com**; autoriza desde el navegador.
3. En GitHub Desktop ve a **File → Add local repository**. Si la carpeta no es todavía repositorio, el programa ofrecerá **Create a Repository Here**. Selecciónala.
4. Si no te ofrece esa opción: **File → New repository**, usa el nombre `CPRC-Preventive-Fase4` y selecciona como *Local path* el lugar donde guardaste la carpeta (comprueba que las carpetas del proyecto queden dentro del repositorio creado; si no, cópialas allí).
5. En el panel **Changes** revisa que aparezcan archivos del proyecto. No deben aparecer `db.sqlite3`, claves privadas o dependencias descargadas.
6. Abajo, en **Summary**, escribe `Versión inicial del prototipo CPRC Preventive` y pulsa **Commit to main**.
7. Arriba pulsa **Publish repository**. Elige el nombre `CPRC-Preventive-Fase4`.
8. Para que el tutor pueda **leer el código sin necesidad de ser colaborador**, desmarca **Keep this code private** y publica. Haz esto **solo si vuestro equipo está conforme con publicar el código y no contiene información personal o confidencial**.
9. Pulsa **Publish Repository**. Luego ve a **Repository → View on GitHub**.
10. Copia la dirección de tu repositorio, por ejemplo `https://github.com/USUARIO/CPRC-Preventive-Fase4` (ejemplo, sustituir USUARIO).
11. Abre la dirección en una ventana privada del navegador: si es público, debes poder ver `README.md`, `backend`, `frontend` y `docs` sin iniciar sesión. Esta es la prueba del acceso de lectura.
12. Pega la dirección real en el anexo de GitHub del documento maestro.

## ¿Si quieres que sea privado?

- Abre tu repositorio en GitHub → **Settings → Collaborators → Add people** e invita la cuenta indicada por el tutor. El tutor debe aceptar la invitación.
- **Advertencia:** en un repositorio personal privado, el acceso de colaborador puede permitir escribir; no equivale necesariamente a una cuenta con rol exclusivo `Read`. Si la rúbrica exige formalmente el rol *Read*, usa una **organización GitHub** que permita asignar ese rol o consulta con el tutor si acepta repositorio público. Consulta los controles efectivos de acceso antes de compartir.
- Comprueba los permisos con el tutor antes del envío.

## Actualizar GitHub después de cambiar código

1. Guarda los cambios en el proyecto local.
2. Abre GitHub Desktop, entra en ese repositorio y revisa las modificaciones.
3. En Summary escribe `Correcciones Fase 4 - pruebas y documentación`.
4. Pulsa **Commit to main** y después **Push origin**.
5. Revisa la página web en GitHub para confirmar que muestra los archivos modificados.

## Alternativa desde la web (si no usas GitHub Desktop)

1. En GitHub inicia sesión → signo `+` → **New repository**.
2. Escribe el nombre `CPRC-Preventive-Fase4` y decide si será público o privado; pulsa **Create repository**.
3. En la página del repositorio elige **uploading an existing file** o **Add file → Upload files**.
4. Arrastra los **archivos y carpetas descomprimidos**, no el ZIP. Confirma que GitHub haya conservado las rutas de las carpetas. Si hay límites de archivos, hazlo en lotes.
5. Escribe un mensaje de confirmación y selecciona **Commit changes**.
6. Comprueba que se ven `backend`, `frontend`, `README.md` y `demo-sin-instalacion`.
7. Copia el enlace en el anexo del documento.

## Comprobaciones finales

- ¿Se puede abrir el enlace desde otro navegador?
- ¿El archivo README explica cómo instalar y ejecutar?
- ¿Están frontend, backend, pruebas, diagramas y evidencia?
- ¿No hay archivos con datos personales, contraseñas o bases locales?
- ¿El tutor puede leer el repositorio según la configuración elegida?
