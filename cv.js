var cv = require('opencv');
var arDrone = require('ar-drone');
var client  = arDrone.createClient();

// access the head camera
client.config('video:video_channel', 0);

function faceRec(client, cv) {
  var stream = new cv.ImageStream()

  stream.on('data', function(matrix){
    matrix.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
      if(err){
        console.log('error: ' + err)
      }
      else {
        console.log('no err')
      }

      if()
    });

  })

  client.getPngStream().pipe(stream);
}

function goForward() {
  client.stop();
  client.forward(.2);
  client.after(1000, function() {
    client.stop();
  });
}

function lookForFaces() {
  client.stop();
  client.clockwise(.3);
  client.after(1000, function() {
    client.stop();
  });
}

setTimeout(function() {client.land();}, 20000)

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
