from django.db import models

class LearningModule(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=120)
    summary = models.CharField(max_length=400)
    body = models.TextField()
    takeaways = models.JSONField(default=list)
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ('position', 'id')

    def __str__(self):
        return self.title

class QuizQuestion(models.Model):
    prompt = models.CharField(max_length=500)
    choices = models.JSONField(default=list)
    correct_index = models.PositiveSmallIntegerField()
    explanation = models.TextField()
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ('position', 'id')

    def clean(self):
        from django.core.exceptions import ValidationError
        if len(self.choices) < 2 or self.correct_index >= len(self.choices):
            raise ValidationError('La pregunta debe tener al menos 2 opciones e índice correcto válido.')

class AnonymousQuizRun(models.Model):
    """Solo almacena conteos agregados por prueba, SIN IP, nombre, correo ni respuestas."""
    score = models.PositiveSmallIntegerField()
    total = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
