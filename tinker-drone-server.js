/********************************
 * TinkerDrone 
 * Node.js (Express)
 ********************************/ 
var express = require('express'),
    http = require('http'),
    app = express(),
    arDrone = require('ar-drone'),
    Cylon = require('cylon'),
    path = require("path");

var tinkerCylonDrone = Cylon.robot({
    connection: { name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1' },
    device: {name: 'drone', driver: 'ardrone'},
    work: function(tinkerdrone) {
        
        tinkerdrone.drone.takeoff();
        
        after((10).seconds(), function() { 
            tinkerdrone.drone.land();
        });

        after((15).seconds(), function() { 
            tinkerdrone.drone.stop();
        });    
    }
});

/**
 * Application
 */ 
app.configure(function() {
    app.set('port', process.env.PORT || 2001);
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'tinker-drone-client')));
});

/**
 * Server
 */ 
var server = http.createServer(app);
server.listen(app.get("port"), function() {
    return console.log("Node Express server listening on port " + app.get("port"));
});

/**
 * APIs
 */ 
app.get('/', function(req, res){
    res.sendfile('./tinker-drone-client/index.html');
});

app.get('/start', function(req, res){
    tinkerCylonDrone.start();
    return console.log("-- cylon tinker drone starting");
});

module.exports = app;


/*var client  = arDrone.createClient();
var pngStream = client.getPngStream();
require('ar-drone-png-stream')(client, { port: 8000 });

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

//---------------------------------------------------------------
/*    var currentImg, imageSendingPaused, server, socket;
    var express = require("express"),
        faye = require("faye"),
        path = require("path"),
        drone = require("ar-drone").createClient(),
        
    app = express();
    drone.config('general:navdata_demo', 'TRUE');  
    
    app.configure(function() {
        app.set('port', process.env.PORT || 3001);
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'drone-client')));
        return app.use("/components", express.static(path.join(__dirname, 'components')));
    });
    
    server = require("http").createServer(app);
    
    new faye.NodeAdapter({
        mount: '/faye',
        timeout: 45
    }).attach(server);
    
    socket = new faye.Client("http://localhost:" + (app.get("port")) + "/faye");
    
    socket.subscribe("/drone/move", function(cmd) {
        var _name;
        console.log("move", cmd);
        return typeof drone[_name = cmd.action] === "function" ? drone[_name](cmd.speed) : void 0;
    });
  

    socket.subscribe("/drone/animate", function(cmd) {
        console.log('animate', cmd);
        return drone.animate(cmd.action, cmd.duration);
    });
  

    socket.subscribe("/drone/drone", function(cmd) {
        var _name;
        console.log('drone command: ', cmd);
        return typeof drone[_name = cmd.action] === "function" ? drone[_name]() : void 0;
    });
    
    server.listen(app.get("port"), function() {
        return console.log("Express server listening on port " + app.get("port"));
    });
  
  
  currentImg = null;
  
  drone.on('navdata', function(data) {
    return socket.publish("/drone/navdata", data);
  });
  
  imageSendingPaused = false;
  
  drone.createPngStream().on("data", function(frame) {
    currentImg = frame; 
    if (imageSendingPaused) {
      return;
    }
    
    socket.publish("/drone/image", "/image/" + (Math.random()));
    
    imageSendingPaused = true;
    
    return setTimeout((function() {
      return imageSendingPaused = false;
    }), 100);
  
  });
  
  app.get("/image/:id", function(req, res) {
      res.writeHead(200, {
      "Content-Type": "image/png"
      });
    return res.end(currentImg, "binary");
  });

*/
