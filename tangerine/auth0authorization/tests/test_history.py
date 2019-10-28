from django.test import TestCase
from auth0authorization.models import Auth0User , History
from django.utils import timezone

#Test the model for History
class HistoryTests(TestCase):

#Set up data
   def setUpTestData(cls):
        auth1 = Auth0User.objects.create(subject=1)
        auth2 = Auth0User.objects.create(subject=2)
        hist = History.objects.create(historyID=1,userID=auth1, source="UTS", destination="USYD", keyword="gym", date=timezone.now(),)
        hist1 = History.objects.create(historyID=2,userID=auth1, source="Town Hall", destination="Central", keyword="gym", date=timezone.now())
        histf = History.objects.create(historyID=3,userID=auth1, source="UTS", destination="USYD", keyword="gym", date=timezone.now(), favourite=True)
        histf1 = History.objects.create(historyID=4,userID=auth1, source="Redfern", destination="USYD", keyword="gym", date=timezone.now(), favourite=True)
        histf2 = History.objects.create(historyID=5,userID=auth2, source="UTS", destination="Burwood", keyword="gym", date=timezone.now(), favourite=True)

#Test that history creation is fine
    def test_history_creation(self):
        history = History.objects.create(historyID=6, userID=Auth0User.objects.get(subject=1), source="burwood", destination="redfern", keyword="bar", date=timezone.now())
        self.assertTrue(isinstance(history, History))

#Test that userID is correct
    def test_history_user(self):
        hist= History.objects.get(historyID=1)
        auth1 = Auth0User.objects.get(subject=1)
        expected_user = hist.userID
        self.assertTrue(expected_user.subject,auth1.subject)

#Test that history source is correct
    def test_history_source(self):
        hist= History.objects.get(historyID=1)
        expected_source = hist.source
        self.assertTrue(expected_source,"UTS")

#Test that history destination is correct
    def test_history_destination(self):
        hist= History.objects.get(historyID=1)
        expected_destination = hist.destination
        self.assertTrue(expected_destination,"USYD")

#Test that history keyword is correct
    def test_history_keyword(self):
        hist= History.objects.get(historyID=1)
        expected_keyword = hist.keyword
        self.assertTrue(expected_keyword,"gym")

#Test that user's favourite list can be filtered correctly
    def test_get_favourite_list1(self):
        auth1 = Auth0User.objects.get(subject=1)
        favList = list(History.objects.filter(userID=auth1, favourite=True))
        hist1 = History.objects.get(historyID=3)
        hist2 = History.objects.get(historyID=4)
        expected = [hist2,hist1]
        self.assertEquals(favList,expected)

#Test that another user's favourite list can be filtered correctly
    def test_get_favourite_list_other_user(self):
        auth2 = Auth0User.objects.get(subject=2)
        favList = list(History.objects.filter(userID=auth2, favourite=True))
        hist1 = History.objects.get(historyID=5)
        expected = [hist1]
        self.assertEquals(favList,expected)


