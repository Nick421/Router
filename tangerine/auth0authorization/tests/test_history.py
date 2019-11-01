from django.test import TestCase
from auth0authorization.models import Auth0User , History, RemoteUserManager
from django.utils import timezone

#Test the model for History
class HistoryTests(TestCase):

        #Set up data
   @classmethod
   def setUp(cls):
        auth1 = Auth0User.objects.create(userID=1)
        auth2 = Auth0User.objects.create(userID=2)
        hist = History.objects.create(historyID=1,userID=auth1, source="UTS", destination="USYD", keyword="gym", date=timezone.now(),)
        hist1 = History.objects.create(historyID=2,userID=auth1, source="Town Hall", destination="Central", keyword="gym", date=timezone.now())
        histf = History.objects.create(historyID=3,userID=auth1, source="UTS", destination="USYD", keyword="gym", date=timezone.now(), favourite=True)
        histf1 = History.objects.create(historyID=4,userID=auth1, source="Redfern", destination="USYD", keyword="gym", date=timezone.now(), favourite=True)
        histf2 = History.objects.create(historyID=5,userID=auth2, source="UTS", destination="Burwood", keyword="gym", date=timezone.now(), favourite=True)

#Test that history creation is correct
   def test_history_creation(self):
        history = History.objects.create(historyID=6, userID=Auth0User.objects.get(userID=1), source="burwood", destination="redfern", keyword="bar", date=timezone.now())
        self.assertTrue(isinstance(history, History))

    #Test that userID is correct
   def test_history_user(self):
        hist= History.objects.get(historyID=1)
        auth1 = Auth0User.objects.get(userID=1)
        expected_user = hist.userID
        self.assertTrue(expected_user.userID,auth1.userID)

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

   def test_get_favourite_list1(self):
        auth1 = Auth0User.objects.get(userID=1)
        favList = list(History.objects.filter(userID=auth1, favourite=True))
        hist1 = History.objects.get(historyID=3)
        hist2 = History.objects.get(historyID=4)
        expected = [hist2,hist1]
        self.assertEquals(favList,expected)

   def test_get_favourite_list_other_user(self):
        auth2 = Auth0User.objects.get(userID=2)
        favList = list(History.objects.filter(userID=auth2, favourite=True))
        hist1 = History.objects.get(historyID=5)
        expected = [hist1]
        self.assertEquals(favList,expected)

   def delete_all_history():
        History.objects.all().delete()
        self.assertNull(History.objects.all())

   def delete_user_history():
        auth1 = Auth0User.objects.get(userID=1)
        user_history = History.objects.filter(userID=auth1)
        user_history.delete()
        self.assertNull(History.objects.filter(userID=auth1))

   def test_delete_favourite_list1(self):
        auth1 = Auth0User.objects.get(userID=1)
        favList = History.objects.filter(userID=auth1, favourite=True).update(favourite=False)
        returnedList = History.objects.filter(userID=auth1, favourite=True)
        self.assertEquals(len(returnedList), 0)

   def test_create_favourite_list1(self):
        auth1 = Auth0User.objects.get(userID=1)
        favList = list(History.objects.filter(userID=auth1, favourite=False)).update(favourite=True)
        returnedList = History.objects.filter(userID=auth1, favourite=True)
        self.assertEquals(len(returnedList), 4)



