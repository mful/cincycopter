var cv = require('opencv');

var img1 = cv.readImage('images/photo_template.jpg', function(err, im) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("image read")
  }
})
//var img2 = cv.imread('images/photo_template.jpg', cv.CV_LOAD_IMAGE_GRAYSCALE)

var surf = cv.SURF()

var img1_kp, img1_descriptors = surf.detect(img1,None,useProvidedKeypoints = False)

console.log(img1_kp)

