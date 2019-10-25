from django.test import TestCase
from auth0authorization.models import Auth0User , History
from django.utils import timezone


class HistoryTests(TestCase):

    def setUp(self):
        auth1 = Auth0User.objects.create(subject=1)
        auth2 = Auth0User.objects.create(subject=2)
        hist = History.objects.create(historyID=1,userID=auth1, source="UTS", destination="USYD", keyword="gym", date=timezone.now(),)
        hist1 = History.objects.create(historyID=2,userID=auth1, source="Town Hall", destination="Central", keyword="gym", date=timezone.now())
        histf = History.objects.create(historyID=3,userID=auth1, source="UTS", destination="USYD", keyword="gym", date=timezone.now(), favourite=True)
        histf1 = History.objects.create(historyID=4,userID=auth1, source="Redfern", destination="USYD", keyword="gym", date=timezone.now(), favourite=True)
        histf2 = History.objects.create(historyID=5,userID=auth2, source="UTS", destination="Burwood", keyword="gym", date=timezone.now(), favourite=True)


   # def setUpTestData(cls):
   #     History.objects.create(userID_id="1", source="UTS", destination="USYD", keyword="gym", date=timezone.now())

    def test_history_creation(self):
        history = History.objects.create(historyID=6, userID=Auth0User.objects.get(subject=1), source="burwood", destination="redfern", keyword="bar", date=timezone.now())
        self.assertTrue(isinstance(history, History))

    def test_history_user(self):
        hist= History.objects.get(historyID=1)
        auth1 = Auth0User.objects.get(subject=1)
        expected_user = hist.userID
        self.assertTrue(expected_user.subject,auth1.subject)

    def test_history_source(self):
        hist= History.objects.get(historyID=1)
        expected_source = hist.source
        self.assertTrue(expected_source,"UTS")

    def test_history_destination(self):
        hist= History.objects.get(historyID=1)
        expected_destination = hist.destination
        self.assertTrue(expected_destination,"USYD")

    def test_history_keyword(self):
        hist= History.objects.get(historyID=1)
        expected_keyword = hist.keyword
        self.assertTrue(expected_keyword,"gym")

    def test_get_favourite_list1(self):
        auth1 = Auth0User.objects.get(subject=1)
        favList = list(History.objects.filter(userID=auth1, favourite=True))
        hist1 = History.objects.get(historyID=3)
        hist2 = History.objects.get(historyID=4)
        expected = [hist2,hist1]
        self.assertEquals(favList,expected)

    def test_get_favourite_list_other_user(self):
        auth2 = Auth0User.objects.get(subject=2)
        favList = list(History.objects.filter(userID=auth2, favourite=True))
        hist1 = History.objects.get(historyID=5)
        expected = [hist1]
        self.assertEquals(favList,expected)


