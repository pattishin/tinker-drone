/********************************
 * TinkerDrone 
 * Node.js (Express)
 ********************************/ 
var express = require('express'),
    http = require('http'),
    arDrone = require('ar-drone'),
    Cylon = require('cylon'),
    path = require('path'),
    fs = require('fs-plus'),
    app = express(),
    currentImg = [],
    pngStream;


//TODO add telnet option to connect and run drone instead of switching wifi's
//this might help with demoing with a webapp on a mobile device rather than
//desktop interfac
//TODO create a socket between client side and server side to grab keymapping
//so we can control drone instead of just having an automated one

/**
 * @method tinkerCylonDrone
 * @description
 */ 
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
        
        tinkerdrone.drone.animateLeds('fire', 5, 2); 
        tinkerdrone.drone.takeoff();
        
        after((5).seconds(), function() { 
            tinkerdrone.drone.animateLeds('doubleMissile', 5, 2); 
            getDronePicture();
            tinkerdrone.drone.land();
        });

        after((5).seconds(), function() { 
            tinkerdrone.drone.stop();
        });
    }
});

/**
 * @method getDronePicture
 * @description grab the most current frame from png stream
 */
var getDronePicture = function() {
    if(pngStream) {
        pngStream.on("data", function(frame) {
           currentImg.push(frame);
        });
    }
}

/**
 * Application specific
 * @method
 * @description
 */
app.configure(function() {
    app.set('port', process.env.PORT || 2001);
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'tinker-drone-client')));
    return app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));
});

/**
 * Server 
 * @method
 * @description
 */ 
var server = http.createServer(app);
server.listen(app.get("port"), function() {
    return console.log("Node Express server listening on port " + app.get("port"));
});

/**
 * APIs
 * @method
 * @description
 */ 
app.get('/', function(req, res){
    res.sendfile('./tinker-drone-client/index.html');
});

app.get('/start', function(req, res){
    tinkerCylonDrone.start();
    return console.log("-- cylon tinker drone starting");
});

app.get("/image", function(req, res) {
    getDronePicture();
    return console.log("-- getting drone picture");
 });

app.get("/get-drone-image", function(req, res) {
    res.writeHead(200, {"Content-Type": "image/png"});
    //serve up all images taken during current flight
    if(currentImg.length > 0) {
        return res.end(currentImg[currentImg.length-1], "binary");
    }
    var defaultImage = fs.readFileSync('./parrot-drone.png');
    return res.end(defaultImage, 'binary');
});

module.exports = app;

