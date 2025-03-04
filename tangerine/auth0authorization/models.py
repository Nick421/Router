from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)

"""
This class is to override RemoteUser class of Django
so that it conforms to our Auth0 authenticaton
"""


class RemoteUserManager(BaseUserManager):
    def create_user(self, userID, password):
        if not userID:
            raise ValueError('Users must have a subject')
        user = self.model(
            userID=userID
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, userID, password):
        user = self.create_user(userID=userID, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


"""
This class is for Auth0User which is use instead of default django user class
so we can customised the fields that get stored in the database
"""


class Auth0User(AbstractBaseUser, PermissionsMixin):
    userID = models.CharField(
        max_length=35, unique=True, primary_key=True, db_column='userID')

    objects = RemoteUserManager()
    USERNAME_FIELD = 'userID'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        super(Auth0User, self).save(*args, **kwargs)
        return self


"""
This class is for History table and defines all column values
"""


class History(models.Model):
    historyID = models.AutoField(primary_key=True)
    source = models.CharField(max_length=100, null=False, blank=False)
    destination = models.CharField(max_length=100, null=False, blank=False)
    keyword = models.CharField(max_length=100, null=False, blank=False)
    date = models.DateField(auto_now_add=True, null=False)
    userID = models.ForeignKey(
        Auth0User, null=False, on_delete=models.CASCADE, db_column='userID')
    favourite = models.BooleanField(default=False, null=False, blank=False)
