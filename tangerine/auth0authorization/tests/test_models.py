from django.test import TestCase
from auth0authorization.models import Auth0User, History, RemoteUserManager
from django.utils import timezone


# Test the model for History
class modelTest(TestCase):

    # Set up data
    @classmethod
    def setUp(cls):
        auth1 = Auth0User.objects.create(userID=1)
        auth2 = Auth0User.objects.create(userID=2)
        hist = History.objects.create(historyID=1, userID=auth1, source="UTS", destination="USYD", keyword="gym",
                                      date=timezone.now(), )
        hist1 = History.objects.create(historyID=2, userID=auth1, source="Town Hall", destination="Central",
                                       keyword="gym", date=timezone.now())
        histf = History.objects.create(historyID=3, userID=auth1, source="UTS", destination="USYD", keyword="gym",
                                       date=timezone.now(), favourite=True)
        histf1 = History.objects.create(historyID=4, userID=auth1, source="Redfern", destination="USYD", keyword="gym",
                                        date=timezone.now(), favourite=True)
        histf2 = History.objects.create(historyID=5, userID=auth2, source="UTS", destination="Burwood", keyword="gym",
                                        date=timezone.now(), favourite=True)

    """
    Test that History creation is correct
    """

    def test_user_creation(self):
        user1 = Auth0User.objects.create_user("Admin", "password")
        self.assertTrue(user1.userID, "Admin")

    """
    Test that History raises error message for null username
    """

    def test_user_creation_None_username(self):
        with self.assertRaisesMessage(ValueError, 'Users must have a subject'):
            Auth0User.objects.create_user(None, "Pas$w0rd")


    """
       Test that History raises error message for empty username
    """


    def test_user_creation_empty_username_string(self):
        with self.assertRaisesMessage(ValueError, 'Users must have a subject'):
            Auth0User.objects.create_user("", "Pas$w0rd")


    """
    Test that History creation is correct
    """


    def test_history_creation(self):
        history = History.objects.create(historyID=6, userID=Auth0User.objects.get(userID=1), source="burwood",
                                         destination="redfern", keyword="bar", date=timezone.now())
        self.assertTrue(isinstance(history, History))


    """
    Test that History userID is correctly retrieved
    """


    def test_get_history_userID(self):
        hist = History.objects.get(historyID=1)
        auth1 = Auth0User.objects.get(userID=1)
        expected_user = hist.userID
        self.assertTrue(expected_user.userID, auth1.userID)


    """
    Test that History source is correctly retrieved
    """


    def test_get_history_source(self):
        hist = History.objects.get(historyID=1)
        expected_source = hist.source
        self.assertTrue(expected_source, "UTS")


    """
    Test that History destination is correctly retrieved
    """


    def test_get_history_destination(self):
        hist = History.objects.get(historyID=1)
        expected_destination = hist.destination
        self.assertTrue(expected_destination, "USYD")


    """
    Test that History keyword is correctly retrieved
    """


    def test_get_history_keyword(self):
        hist = History.objects.get(historyID=1)
        expected_keyword = hist.keyword
        self.assertTrue(expected_keyword, "gym")


    """
     Test that favourites list is correctly returned for user 1
    """


    def test_get_favourite_list_userID1(self):
        auth1 = Auth0User.objects.get(userID=1)
        favList = list(History.objects.filter(userID=auth1, favourite=True))
        hist1 = History.objects.get(historyID=3)
        hist2 = History.objects.get(historyID=4)
        expected = [hist2, hist1]
        self.assertEquals(favList, expected)


    """
     Test that favourites list is correctly returned for user 2
    """


    def test_get_favourite_list_userID2(self):
        auth2 = Auth0User.objects.get(userID=2)
        favList = list(History.objects.filter(userID=auth2, favourite=True))
        hist1 = History.objects.get(historyID=5)
        expected = [hist1]
        self.assertEquals(favList, expected)


    """
     Test that all history can be deleted correctly
    """


    def test_delete_all_history(self):
        deleted = History.objects.all().delete()
        self.assertEquals(deleted[0], 5)
        self.assertEquals(len(History.objects.all()), 0)


    """
     Test that only history for a user can be deleted correctly
    """


    def test_delete_user_history(self):
        auth1 = Auth0User.objects.get(userID=1)
        deleted = History.objects.filter(userID=auth1).delete()
        self.assertEquals(deleted[0], 4)
        self.assertEquals(len(History.objects.filter(userID=auth1)), 0)


    """
     Test that favourites list for a single user can be deleted correctly 
    """


    def test_delete_favourite_list_userID1(self):
        auth1 = Auth0User.objects.get(userID=1)
        favList = History.objects.filter(userID=auth1, favourite=True).update(favourite=False)
        returnedList = History.objects.filter(userID=auth1, favourite=True)
        self.assertEquals(len(returnedList), 0)


    """
     Test that favourites list is correctly created for a single user 
    """


    def test_create_favourite_list_userID1(self):
        auth1 = Auth0User.objects.get(userID=1)
        favList = History.objects.filter(userID=auth1, favourite=False).update(favourite=True)
        returnedList = History.objects.filter(userID=auth1, favourite=True)
        self.assertEquals(len(returnedList), 4)
