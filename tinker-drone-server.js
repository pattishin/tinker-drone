/********************************
 * TinkerDrone 
 * Node.js (Express)
 ********************************/ 
var express = require('express'),
    http = require('http'),
    arDrone = require('ar-drone'),
    Cylon = require('cylon'),
    path = require('path'),
    app = express(),
    currentImg,
    pngStream;

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

        pngStream = tinkerdrone.drone.getPngStream();
        
        tinkerdrone.drone.takeoff();
        after((5).seconds(), function() { 
            getDronePicture(); 
            tinkerdrone.drone.land();
        });
       
        after((5).seconds(), function() { 
            tinkerdrone.drone.stop();
        });
    }
});

/**/
var getDronePicture = function() {
    if(pngStream) {
        pngStream.on("data", function(frame) {
           currentImg = frame;
        });
    }
}

/**
 * Application
 */
app.configure(function() {
    app.set('port', process.env.PORT || 2001);
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'tinker-drone-client')));
    return app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));
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

app.get("/image", function(req, res) {
    res.writeHead(200, {"Content-Type": "image/png"});
    //getDronePicture();
    return res.end(currentImg, "binary");
 });

module.exports = app;

