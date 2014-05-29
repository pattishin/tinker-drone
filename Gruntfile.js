
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        ffmpeg: {
            video: {
                files: [{
                    expand: true,
                    cwd: 'video_source',
                    src: ['*.avi', '*.flv'],
                    dest: 'dist',
                    ext: '.mp4'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-ffmpeg');
    grunt.registerTask('default', ['ffmpeg']);
};
