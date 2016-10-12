from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from content.models import Asset

from content.base_test import BaseTests


class AssetTests(BaseTests):
    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('asset:asset')
        data = self.data
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Asset.objects.count(), 1)
        self.assertEqual(Asset.objects.get().country, 'testcountry')