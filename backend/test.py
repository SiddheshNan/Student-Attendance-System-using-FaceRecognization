import cv2, numpy

blank_image = numpy.zeros((90, 512, 3), numpy.uint8)
blank_image[:] = (0, 124, 255)
cv2.putText(blank_image, f"Student added Successfully!", (20, 50), cv2.FONT_HERSHEY_PLAIN, 2, (255, 255, 255), 2)
cv2.imshow('Image', blank_image)

while True:
    key = cv2.waitKey(5)
    if key == 27:
        cv2.destroyAllWindows()
        break