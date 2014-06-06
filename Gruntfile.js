
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        run: 'node drone.js'
    });
    grunt.loadNpmTasks('grunt-ffmpeg');
    grunt.registerTask('default', ['ffmpeg']);
};

/**
 * Gruntfile for In App Infinite Scroll
 * For more information: http://gruntjs.com/
 */ 

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        run: 'node tinkerdrone.js',
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', [
        'jshint',
        'run'
    ]);
};


