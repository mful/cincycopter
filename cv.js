//var cv = require('opencv');
var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.takeoff();


client
  .after(5000, function() {
    this.clockwise(0.5);
  })
  .after(3000, function() {
    this.stop();
    this.land();
  });

//var stream = new cv.ImageStream()

//stream.on('data', function(matrix){
//  console.log(matrix);
//})

//ardrone.getPngStream().pipe(s);
