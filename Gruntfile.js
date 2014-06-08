module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        run: {
            droneserver: {
                cmd: 'node',
                args: ['tinker-drone-server.js'],
                options: {
                    passArgs: ['port']
                }
            }
        },
        browserify: {
            options: {
                debug: true,
                transform: ['reactify'],
                extensions: ['.jsx']
            },
            app: {
                src: 'tinker-drone-client/main.js',
                dest: 'tinker-drone-client/drone-client.js'
            }
        },
        react: {
            files: {
                expand: true,
                cwd: 'tinker-drone-client',
                src: ['**/*.jsx'],
                dest: 'tinker-drone-client',
                ext: '.js'
            }
        },
        watch: {
            react: {
                files: 'tinker-drone-client/**/*.jsx',
                tasks: ['react']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('default', [
            'react',
            'browserify',
            'run:droneserver'
    ]);
};


