
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var pngStream = client.getPngStream();

pngStream.on('data', console.log);

/*client.on('navdata', function(data) {
    console.log(data.demo.drone.camera);
    console.log(data.demo.detection.camera);
});*/

//console.log(client);
client.takeoff();



// 1) launch
// 2) move forward
// 3) move down to beach ball level

client
  .after(3000, function() {
    this.front(0.1);
    this.down(0.1);
  })
  .after(5000, function() {
    this.stop();
    this.land();
  });
