from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient
from education.models import AnonymousQuizRun, QuizQuestion

class EducationalApiTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command('seed_content', verbosity=0)

    def setUp(self):
        self.client=APIClient()

    def test_health(self):
        response=self.client.get('/api/health/')
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json()['status'],'ok')

    def test_modules_loaded(self):
        response=self.client.get('/api/modules/')
        self.assertEqual(response.status_code,200)
        self.assertEqual(len(response.json()),3)

    def test_module_details(self):
        response=self.client.get('/api/modules/ia/')
        self.assertEqual(response.status_code,200)
        self.assertIn('IA',response.json()['title'])

    def test_missing_module(self):
        self.assertEqual(self.client.get('/api/modules/no-existe/').status_code,404)

    def test_quiz_does_not_disclose_answers(self):
        response=self.client.get('/api/quiz/')
        self.assertEqual(len(response.json()),5)
        self.assertNotIn('correct_index',response.json()[0])

    def test_grading_correct(self):
        expected={str(q.pk):q.correct_index for q in QuizQuestion.objects.all()}
        response=self.client.post('/api/quiz/grade/',{'answers':expected},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json()['score'],5)
        self.assertEqual(AnonymousQuizRun.objects.count(),1)

    def test_grading_wrong(self):
        answers={str(q.pk):(q.correct_index+1)%len(q.choices) for q in QuizQuestion.objects.all()}
        response=self.client.post('/api/quiz/grade/',{'answers':answers},format='json')
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json()['score'],0)

    def test_reject_incomplete_answers(self):
        response=self.client.post('/api/quiz/grade/',{'answers':{'1':0}},format='json')
        self.assertEqual(response.status_code,400)
        self.assertEqual(AnonymousQuizRun.objects.count(),0)

    def test_reject_out_of_range(self):
        answers={str(q.pk):999 for q in QuizQuestion.objects.all()}
        response=self.client.post('/api/quiz/grade/',{'answers':answers},format='json')
        self.assertEqual(response.status_code,400)
        self.assertEqual(AnonymousQuizRun.objects.count(),0)
