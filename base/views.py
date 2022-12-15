import time
from django.shortcuts import render
from agora_token_builder import RtcTokenBuilder
from django.http import JsonResponse
import random
# Create your views here.

def getToken(request):
    appId='b10afe58f9094b50b51e0099e6aad855'
    appCertificate ='b59c8d3bb7174b7e873ce9d1e45bc167'
    channelName = request.GET.get('channel')
    uid = random.randint(1,230)
    expirationTimeInSeconds = 3600*24*24
    currentTimeStamp = time.time()
    privilegeExpiredTs=currentTimeStamp+expirationTimeInSeconds
    role=1

    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({'token':token,'uid':uid},safe=False)
def lobby(request):
    return render(request,'base/lobby.html')
def room(request):
    return render(request,'base/room.html')
