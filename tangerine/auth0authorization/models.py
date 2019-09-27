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

    def create_superuser(self, subjet):
        user = self.create_user(subject=subject)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    subject = models.CharField(max_length=35, unique=True, primary_key=True)

    objects = RemoteUserManager()
    USERNAME_FIELD = 'subject'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        return self
