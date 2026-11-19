from django.core.management.base import BaseCommand
from education.models import LearningModule, QuizQuestion

MODULES = [
    {
      'slug':'fundamentos', 'title':'Reconoce el phishing',
      'summary':'Identifica qué es, en qué canales aparece y qué señales merecen verificación.',
      'body': 'El phishing es un intento de engaño que busca que una persona confíe en una comunicación que aparenta ser legítima. Puede llegar por correo, mensajes, llamadas y redes sociales. No todos los mensajes sospechosos tienen errores ortográficos: algunos están muy bien redactados. Verifica una solicitud inesperada por un canal oficial que tú mismo abras; no dependas del enlace ni del teléfono incluidos en el mensaje.',
      'takeaways':['No compartas contraseñas ni códigos de verificación.', 'Comprueba el remitente y la dirección del sitio, sin confiar solo en su apariencia.', 'Ante la duda, abre por tu cuenta la aplicación o página oficial.'],
    },
    {
      'slug':'ia', 'title':'Engaños potenciados con IA',
      'summary':'Comprende por qué una voz, imagen o mensaje convincente no es prueba suficiente de identidad.',
      'body':'Herramientas de inteligencia artificial pueden facilitar la creación de mensajes persuasivos, voces sintéticas e imágenes manipuladas. La señal de alerta no es únicamente la calidad del contenido, sino el contexto: peticiones inesperadas, urgencia, presión y solicitudes de datos sensibles. Una verificación independiente y una pausa para corroborar la identidad son medidas preventivas útiles.',
      'takeaways':['Una voz familiar no confirma por sí sola quién está hablando.', 'No uses una imagen convincente como única prueba de autenticidad.', 'Contrasta las peticiones inusuales con un canal que ya conocías.'],
    },
    {
      'slug':'habitos', 'title':'Hábitos de protección',
      'summary':'Practica decisiones preventivas para el uso cotidiano de servicios digitales.',
      'body':'Las prácticas de prevención incluyen utilizar autenticación multifactor, mantener actualizados dispositivos y aplicaciones, verificar las comunicaciones inesperadas y evitar compartir códigos temporales. Para denunciar o pedir orientación, consulta los canales oficiales de la entidad afectada y los recursos públicos de ciberseguridad de Colombia.',
      'takeaways':['Activa autenticación multifactor cuando esté disponible.', 'Actualiza las aplicaciones y protege tus claves.', 'Informa de los mensajes sospechosos a través de canales oficiales.'],
    },
]
QUIZ = [
    ('Recibes un mensaje inesperado que dice que tu cuenta será bloqueada y te pide abrir un enlace. ¿Qué haces?',
      ['Abro el enlace inmediatamente', 'Entro a la aplicación oficial por mi cuenta y verifico', 'Comparto mi código de acceso'],1,
      'La verificación debe hacerse en un canal oficial que abras de forma independiente.'),
    ('Una persona conocida parece pedirte un código temporal mediante un audio. ¿Cuál es la decisión más segura?',
      ['Entrego el código porque reconozco la voz', 'Reenvío el audio sin verificar', 'Confirmo la solicitud por otro canal y no comparto códigos'],2,
      'Las voces pueden imitarse; los códigos de acceso no deben compartirse.'),
    ('¿Cuál de estas afirmaciones es más precisa?',
      ['Un mensaje bien escrito siempre es legítimo', 'Los engaños digitales pueden estar bien redactados', 'Solo existe phishing por correo electrónico'],1,
      'La calidad de la redacción no permite establecer autenticidad.'),
    ('Si observas un remitente desconocido y una petición urgente, lo más adecuado es:',
      ['Verificar por un medio oficial independiente','Responder con mis datos para salir de dudas','Ignorar cualquier verificación'],0,
      'Ante una petición inesperada, comprueba antes de actuar.'),
    ('¿Cuál es una práctica preventiva recomendable?',
      ['Compartir claves con personas de confianza', 'Usar la misma clave en todas las cuentas', 'Activar autenticación multifactor'],2,
      'La autenticación multifactor ofrece una capa adicional de protección.'),
]

class Command(BaseCommand):
    help = 'Carga de forma idempotente los contenidos pedagógicos y preguntas de demostración.'
    def handle(self,*args,**options):
        for ix, item in enumerate(MODULES):
            slug=item['slug']; defaults={**item, 'position':ix}
            LearningModule.objects.update_or_create(slug=slug, defaults=defaults)
        for ix,(prompt,choices,correct_index,explanation) in enumerate(QUIZ):
            QuizQuestion.objects.update_or_create(position=ix, defaults={
                'prompt':prompt,'choices':choices,'correct_index':correct_index,
                'explanation':explanation,'position':ix
            })
        self.stdout.write(self.style.SUCCESS('3 módulos y 5 preguntas cargados correctamente.'))
