# Matriz de trazabilidad — CPRC Preventive

La relación es preliminar y debe ajustarse con hallazgos reales del diagnóstico. La evidencia de verificación manual debe completarse por el equipo.

| ID | Requerimiento | Criterio de aceptación | Prueba | Evidencia |
|---|---|---|---|---|
| RF-01 | Mostrar inicio, propósito y navegación | Cinco secciones accesibles desde menú | PF-01 | Captura / video |
| RF-02 | Consultar contenidos por módulos | Tres módulos devueltos por API y visibles | PF-02 | API + captura |
| RF-03 | Contenido sobre phishing e IA | Dos módulos describen dichas modalidades | PF-03 | Contenido semilla |
| RF-04 | Actividad práctica educativa | Cinco preguntas con 3 opciones cada una | PF-04 | Captura y prueba API |
| RF-05 | Calificar sin filtrar soluciones antes | Quiz GET sin respuestas correctas; POST califica | PF-05 | Test de API |
| RF-06 | Mostrar retroalimentación por pregunta | Al enviar, se muestra explicación y puntaje | PF-06 | Captura/video |
| RF-07 | Acceder a portales institucionales | Tres recursos externos visibles | PF-07 | Captura |
| RNF-01 | Diseño adaptable | Diseño navegable en móvil y PC | PF-08 | Capturas reales |
| RNF-02 | Navegación y accesibilidad básica | Tabulación, etiquetas, foco visible | PF-09 | Registro manual |
| RNF-03 | Privacidad | No hay formulario de credenciales ni datos personales | PF-10 | Revisión funcional |
| RNF-04 | Trazabilidad | Código, pruebas y README publicados | PF-11 | URL GitHub |
| RNF-05 | Persistencia | API guarda únicamente puntaje agregado sin identidad | PF-12 | Revisión modelo DB |

**Nota TRL5:** una prueba automatizada o una captura de interfaz no demuestra por sí sola validación en entorno relevante. Adjuntar resultados reales de participantes del público objetivo y detallar ambiente y condiciones.
