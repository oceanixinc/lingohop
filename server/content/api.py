from rest_framework.response import Response
from rest_framework import generics, permissions, status
from .serializers import AudioImageSerializer


class AssetCreate(generics.CreateAPIView):
    serializer_class = AudioImageSerializer

    def post(self, request, format=None, *args, **kwargs):
        serializer = AudioImageSerializer(
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
