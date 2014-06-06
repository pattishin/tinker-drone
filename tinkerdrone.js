
var arDrone = require('ar-drone');
var autonomy = require('ardrone-autonomy');
var mission  = autonomy.createMission();

mission.takeoff()
       .zero()
//    .forward(1)   
//       .right(1.7)     
//       .backward(1) 
//       .left(1.7)
       .hover(500)
       /*.cw(90)
       .hover(500)
       .ccw(180)
       .hover(500)*/
       .land();

mission.run(function (err, result) {
    if (err) {
        console.trace("Oops, something bad happened: %s", err.message);
        mission.client().stop();
        mission.client().land();
    } else {
        console.log("Mission success!");
        process.exit(0);
    }
});



