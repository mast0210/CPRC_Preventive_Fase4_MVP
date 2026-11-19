from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(name='LearningModule', fields=[
            ('id',models.BigAutoField(auto_created=True,primary_key=True,serialize=False,verbose_name='ID')),
            ('slug',models.SlugField(unique=True)),('title',models.CharField(max_length=120)),
            ('summary',models.CharField(max_length=400)),('body',models.TextField()),
            ('takeaways',models.JSONField(default=list)),('position',models.PositiveIntegerField(default=0))],
            options={'ordering':('position','id')}),
        migrations.CreateModel(name='QuizQuestion', fields=[
            ('id',models.BigAutoField(auto_created=True,primary_key=True,serialize=False,verbose_name='ID')),
            ('prompt',models.CharField(max_length=500)),('choices',models.JSONField(default=list)),
            ('correct_index',models.PositiveSmallIntegerField()),('explanation',models.TextField()),
            ('position',models.PositiveIntegerField(default=0))],options={'ordering':('position','id')}),
        migrations.CreateModel(name='AnonymousQuizRun', fields=[
            ('id',models.BigAutoField(auto_created=True,primary_key=True,serialize=False,verbose_name='ID')),
            ('score',models.PositiveSmallIntegerField()),('total',models.PositiveSmallIntegerField()),
            ('created_at',models.DateTimeField(auto_now_add=True))])
    ]
