
var arDrone = require('ar-drone');
var starfox = require('starfox');


var http = require('http'),
    fs = require('fs'),
        path = require('path');

    var server = http.createServer(function(request, response) {
     var testFile = fs.createReadStream(path.join(__dirname, 'index.html'));
                     testFile.pipe(response);
    });
            
starfox.on('connection', function(player) {
    player.on('input', function(gamepadState) {
        console.log(gamepadState);
    });
    player.on('gamepadsChanged', function(gamepads) {
        console.log(gamepads);
    });
});

starfox.mount(server);
server.listen(3000);

//var client  = arDrone.createClient();
//var pngStream = client.getPngStream();
/*require('ar-drone-png-stream')(client, { port: 8000 });

//pngStream.on('data', console.log);

client.on('navdata', function(data) {
    console.log(data.demo.drone.camera);
    console.log(data.demo.detection.camera);
});

//console.log(client);
client.takeoff();



// 1) launch
// 2) move forward
// 3) move down to beach ball level

client
  .after(5000, function() {
    //this.front(0.05);
    this.down(0.05);
  })
  .after(5000, function() {
    this.stop();
    this.land();
  });
*/

//var autonomy = require('ardrone-autonomy');
//var mission  = autonomy.createMission();

/*mission.takeoff()
       .zero()       // Sets the current state as the reference
       .altitude(1)  // Climb to altitude = 1 meter
       .forward(1)   
       .right(1.7)     
       .backward(1) 
       .left(1.7);

mission.run(function (err, result) {
    if (err) {
        console.trace("Oops, something bad happened: %s", err.message);
        mission.client().stop();
        mission.client().land();
    } else {
        console.log("Mission success!");
        process.exit(0);
    }
});*/
