module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    livereload: true,
                    directory: "dist"
                }
            }
        },

        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/views',
                    src: '**/*.html',
                    dest: 'dist/'
                }, {
                    expand: true,
                    cwd: 'bower_components/font-awesome/fonts',
                    src: '**/*',
                    dest: 'dist/fonts/'
                }]
            }
        },

        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: ['**/*.png'],
                    dest: 'dist/img'
                }]
            }
        },

        jshint: {
            dev: {
                files: {
                    src: ['src/js/**/*.js']
                }
            }
        },

        sass: {
            dev: {
                files: {
                    'dist/css/main.css': [
                        'src/sass/**/*.scss'
                    ]
                }
            }
        },

        uglify: {
            dev: {
                files: {
                    'dist/js/base.min.js': [
                        'bower_components/jquery/jquery.min.js',
                        'bower_components/jquery-ui/jquery-ui.min.js',
                        'bower_components/lodash/dist/lodash.min.js',
                        'bower_components/modernizr/modernizr.js',
                        'bower_components/foundation/js/foundation.min.js',
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular-cookies/angular-cookies.min.js',
                        'bower_components/angular-foundation/mm-foundation.min.js',
                        'bower_components/angular-foundation/mm-foundation-tpls.min.js',
                        'src/js/**/*.js'
                    ]
                }
            }
        },

        watch: {
            dev: {
                files: ['src/js/**/*.js', 'src/sass/**/*.scss'],
                tasks: ['build'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.log.warn = grunt.warn;

    grunt.registerTask('build', ['jshint:dev', 'uglify:dev', 'sass:dev', 'imagemin:build', 'copy:dev']);
    grunt.registerTask('dev', ['build', 'connect:server', 'watch:dev']);
    grunt.registerTask('default', ['dev']);

};