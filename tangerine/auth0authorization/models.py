from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)


class RemoteUserManager(BaseUserManager):
    def create_user(self, subject, password):
        if not subject:
            raise ValueError('Users must have a subject')
        user = self.model(
            subject=subject
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, subject, password):
        user = self.create_user(subject=subject, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Auth0User(AbstractBaseUser, PermissionsMixin):
    subject = models.CharField(max_length=35, unique=True, primary_key=True)

    objects = RemoteUserManager()
    USERNAME_FIELD = 'subject'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        super(Auth0User, self).save(*args, **kwargs)
        return self


class History(models.Model):
    historyID = models.AutoField(primary_key=True)
    source = models.CharField(max_length=100, null=False, blank=False)
    destination = models.CharField(max_length=100, null=False, blank=False)
    keyword = models.CharField(max_length=100, null=False, blank=False)
    date = models.DateField(auto_now_add=True, null=False)
    userID = models.ForeignKey(
        'Auth0User', null=False, on_delete=models.CASCADE)


class Favourite(models.Model):
    class Meta:
        unique_together = (('userID', 'historyID'),)

    name = models.CharField(max_length=50, blank=True)
    userID = models.ForeignKey(
        'Auth0User', null=False, on_delete=models.CASCADE)
    historyID = models.ForeignKey(
        'History', null=False, on_delete=models.CASCADE)

