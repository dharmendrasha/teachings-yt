""""
python > 3.9
opencv-python > 3 #pip install opencv-python
camera attached to your system
2 gb memory
1core cpu

https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_frontalface_default.xml
https://github.com/Itseez/opencv/blob/master/data/haarcascades/haarcascade_eye.xml 

"""

import cv2

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml') 
eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')  

cap = cv2.VideoCapture(0)

while 1:
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    for(x, y, w, h) in faces:
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,255,0),2)  
        roi_gray = gray[y:y+h, x:x+w] 
        roi_color = img[y:y+h, x:x+w] 
        
        eyes = eye_cascade.detectMultiScale(roi_gray)
        
        #To draw a rectangle in eyes 
        for (ex,ey,ew,eh) in eyes: 
            cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,127,255),2) 
            
    
    cv2.imshow('img',img) 
        
    
    k = cv2.waitKey(30) & 0xff
    if k == 27: 
        break
    
    
    
# Close the window 
cap.release() 
  
# De-allocate any associated memory usage 
cv2.destroyAllWindows()  

