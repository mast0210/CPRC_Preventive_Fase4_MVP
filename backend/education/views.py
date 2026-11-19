from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import AnonRateThrottle
from .models import LearningModule, QuizQuestion, AnonymousQuizRun
from .serializers import ModuleSerializer, PublicQuestionSerializer, SubmissionSerializer

@api_view(['GET'])
def health(request):
    return Response({'status':'ok','application':'CPRC Preventive','version':'1.0.0'})

@api_view(['GET'])
def modules(request):
    return Response(ModuleSerializer(LearningModule.objects.all(), many=True).data)

@api_view(['GET'])
def module_detail(request, slug):
    module = get_object_or_404(LearningModule, slug=slug)
    return Response(ModuleSerializer(module).data)

@api_view(['GET'])
def quiz(request):
    # Nunca se envía correct_index al cliente antes de entregar respuestas.
    questions = QuizQuestion.objects.all()
    return Response(PublicQuestionSerializer(questions, many=True).data)

@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
def grade_quiz(request):
    ser = SubmissionSerializer(data=request.data)
    ser.is_valid(raise_exception=True)
    answers = ser.validated_data['answers']
    questions = list(QuizQuestion.objects.all())
    if not questions:
        return Response({'detail':'No se han cargado preguntas.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    ids = {str(q.pk) for q in questions}
    if set(answers.keys()) != ids:
        return Response({'detail':'Debes responder todas las preguntas, una sola vez.'}, status=status.HTTP_400_BAD_REQUEST)
    results = []
    for q in questions:
        answer = answers[str(q.pk)]
        if answer >= len(q.choices):
            return Response({'detail':f'Respuesta inválida para pregunta {q.pk}.'}, status=status.HTTP_400_BAD_REQUEST)
        results.append({'question_id':q.pk,'selected_index':answer,'correct_index':q.correct_index,
                        'correct':answer==q.correct_index,'explanation':q.explanation})
    score = sum(1 for r in results if r['correct'])
    # No se almacenan respuestas detalladas ni datos identificables.
    AnonymousQuizRun.objects.create(score=score, total=len(questions))
    return Response({'score':score,'total':len(questions),'percentage':round(100*score/len(questions)),
                     'details':results})
