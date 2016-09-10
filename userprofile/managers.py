from django.db import models

# from userprofile.models import User


class UserProfileManager(models.Manager):
    def get_or_create(self, **kwargs):
        print ('manger called')
        # obj = self.create(**kwargs)
        # try:
        #     new_user = User.objects.create_user(**kwargs)
        # except IntegrityError:
        #     return User.objects.get(username=username, email=email)
        # else:
        #     new_user.first_name = kwargs['first_name'] # or what you want
        #     ...etc...

        # return new_user
        return self.get_or_create(**kwargs)

        # return obj

