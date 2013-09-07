var cv = require('opencv');
var arDrone = require('ar-drone');
var client  = arDrone.createClient();

// access the head camera
client.config('video:video_channel', 0);

client.takeoff();
client.clockwise(0.2);

var stream = new cv.ImageStream()

stream.on('data', function(matrix){
  matrix.save('./pic.jpg');
  console.log(matrix.goodFeaturesToTrack());
  matrix.detectObject(cv.FACE_CASCADE, {}, function(err, matches){
    if(err) {
      console.log("err: " + err);
    }else{
      console.log("matches: " + matches.toString());
    }
  })
})

client.getPngStream().pipe(stream);

// client.createRepl();