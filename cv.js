var cv = require('opencv');
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var events = require('events');
var messenger = new events.EventEmitter();

// access the head camera
client.config('video:video_channel', 0);

function faceRec(client, cv) {
  var stream = new cv.ImageStream();

  stream.on('data', function(matrix){
    matrix.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
      if(err){
        console.log('error: ' + err);
      }
      else {
        console.log('no err');
      }

      console.log(faces);
      console.log(faces.length);

      if(faces && faces.length > 0) {
       // messenger.emit('face:found')
        client.stop();
        client.land();
      }
      else {
        messenger.emit('face:not:found')
      }
    });

  })

  client.getPngStream().pipe(stream);
}

function goForward() {
  console.log('go forward');
  client.stop();
  client.stop();
  client.forward(0.2);
  client.after(1000, function() {
    client.stop();
  });
}

function lookForFaces() {
  console.log('looking for faces');
  client.stop();
  client.stop();
  client.clockwise(.3);
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
    messenger.on('face:found', function() {
      goForward();
    });
    messenger.on('face:not:found', function() {
      lookForFaces();
    });
  });

// client.createRepl();
