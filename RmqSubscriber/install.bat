rem ### Run as administrator !!!
sc create FaceRecognition.RmqSubscriber3 binPath="%CD%\bin\Debug\RmqSubscriber.exe" DisplayName="FaceRecognition.RmqSubscriber3" start=auto

pause