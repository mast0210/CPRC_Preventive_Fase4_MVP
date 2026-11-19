from rest_framework import serializers
from .models import LearningModule, QuizQuestion

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningModule
        fields = ['slug', 'title', 'summary', 'body', 'takeaways', 'position']

class PublicQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'prompt', 'choices', 'position']

class SubmissionSerializer(serializers.Serializer):
    answers = serializers.DictField(child=serializers.IntegerField(min_value=0), allow_empty=False)
