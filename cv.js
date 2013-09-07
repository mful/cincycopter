var cv = require('opencv');
var arDrone = require('ar-drone');
var client  = arDrone.createClient();

// access the head camera
client.config('video:video_channel', 0);

function faceRec(client, cv) {
  var stream = new cv.ImageStream()

  stream.on('data', function(matrix){
    matrix.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
      console.log("found " + faces.length + " faces:");
      for (var i=0;i<faces.length; i++){
        console.log("face[" + i + "]:");
        var x = faces[i]
        matrix.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
        matrix.save('./faces/face' + new Date().getTime() + '.jpg');
      }
    });

  })

  client.getPngStream().pipe(stream);
}

client.takeoff();

client
  .after(3000, function() {
    this.up(1);
  })
  .after(1300, function() {
    this.stop();
    faceRec(client, cv);
  });

// client.createRepl();