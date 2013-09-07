var cv = require('opencv');
var arDrone = require('ar-drone');
var client  = arDrone.createClient();

// access the head camera
client.config('video:video_channel', 0);

function faceRec(client, cv) {
  var stream = new cv.ImageStream()

  stream.on('data', function(matrix){
    matrix.save('./pic.jpg');
    // console.log(matrix.goodFeaturesToTrack());
    matrix.detectObject(cv.FACE_CASCADE, {}, function(err, matches){
      if(err) {
        console.log("err: " + err);
      }else if(matches.length > 0) {
        console.log("matches: " + matches.length);
        client.front(0.1);
      }else{
        // client.clockwise(0.2);
        client.stop();
      }
    })
  })

  client.getPngStream().pipe(stream);
}

// client.takeoff(function() {
//   client.up(1);

//   client.stop();

//   faceRec(client, cv);
// });

client.takeoff();

client
  .after(3000, function() {
    this.up(1);
  })
  .after(1000, function() {
    this.stop();
    faceRec(client, cv);
  });

// client.createRepl();