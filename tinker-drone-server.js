/********************************
 * TinkerDrone 
 * Node.js (Express)
 ********************************/ 
var express = require('express'),
    http = require('http'),
    app = express(),
    arDrone = require('ar-drone'),
    Cylon = require('cylon'),
    path = require('path');

var tinkerCylonDrone = Cylon.robot({
    name: "tinkerdronebot",
    connection: { name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1' },
    device: {name: 'drone', driver: 'ardrone'},
    commands: ["hello"],
    hello: function() {
        return "boom world";
    },
    work: function(tinkerdrone) {
        //tinkerdrone.drone.config('general:navdata_demo', 'TRUE');
        //tinkerdrone.nav.on('update', console.log);

        var pngStream = tinkerdrone.drone.getPngStream();
        
        tinkerdrone.drone.takeoff();
        after((5).seconds(), function() { 
            tinkerdrone.drone.land();
        });
        after((5).seconds(), function() { 
            tinkerdrone.drone.stop();
        });

        pngStream.on("data", function(frame) {
           currentImg = frame;
        });
    }
});

/**
 * Application
 */
 
app.get("/image", function(req, res) {
    res.writeHead(200, {"Content-Type": "image/png"});
    return res.end(currentImg, "binary");
 });

 
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

