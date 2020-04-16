import Adafruit_DHT
import RPi.GPIO as GPIO
import time
import datetime
import urllib

sensor =Adafruit_DHT.DHT11
pin = 4
startTime = time.time()
preH=0
preT=0
standard_Gap_of_T = 3
standard_Gap_of_H = 3
getRight = False
while True:
	
	wtime = datetime.datetime.now()
	h,temp = Adafruit_DHT.read_retry(sensor,pin)
#	gapT = temp-preT
#	gapH = h - preH
	
	if h is not None and temp is not None:
		getRight = True
		print (wtime,'Temp={0:0.1f}*C Humidity={1:0.1f}%'.format(temp,h))
		time.sleep(30)
		html = urllib.urlretrieve("https://api.thingspeak.com/update?api_key=F10XAPR5AQIAWG2I&field1="+str(temp)+"&field2="+str(h))
		
	elif preH+3<h or preH-3>h or preT+3<temp or preT-3>temp :
		html = urllib.urlretrieve("https://api.thingspeak.com/update?api_key=F10XAPR5AQIAWG2I&field1="+str(temp)+"&field2="+str(h))
	
	else:
		getRight = False
		print('Data Input Error')
	
	if getRight is True:
		preH = h
		preT = temp