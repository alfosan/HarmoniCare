from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import User
from .serializers import UserSerializer
from vitalnest.auth.jwt_verifyRefreshToken import verify_refresh_token


class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = self.get_object(pk)

        # print("Datos del usuario recibidos del frontend:", request.data)
        # print("Token recibido:", request.headers.get('Authorization'))

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class VerifyRefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refreshToken')
        if not refresh_token:
            return Response({'valid': False, 'message': 'No refresh token provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = verify_refresh_token(refresh_token)
        if user:
            return Response({'valid': True}, status=status.HTTP_200_OK)
        else:
            return Response({'valid': False}, status=status.HTTP_401_UNAUTHORIZED)