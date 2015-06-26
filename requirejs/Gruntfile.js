/*
 * grunt-cli
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
 */

module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
              'Gruntfile.js',
              'scripts/_src/**/*.js'
            ],
            options: {
                curly: true,
                eqeqeq: false,
                eqnull: true,
                browser: true,
                globals: {
                    window: true,
                    jQuery: true,
                    console: true,
                    module: true,
                    $: true
                }
            }
        },
        uglify: {
            options: {
                preserveComments:'some',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm") %> */',
                mangle: {
                    except: ['jQuery', 'Backbone','Zepto', 'define', 'require', 'exports', 'module']
                }
            },
            configCore: {
                //src: ['scripts/_src/config.js'],
                //dest: 'scripts/config.js'
            },
            dist: {
                src: ['libs/jquery-2.0.3.min.js', 'libs/jquery.cookie.js', 'libs/_util.js', 'scripts/_src/common.js'],
                dest: 'scripts/core.js'
            },
            subdist: {
                files: [{
                    expand: true,
                    cwd: 'scripts/_src',
                    src: ['*.js', '**/*.js'],
                    dest: 'scripts/'
                }]
            }
        },
        clean: {
            build: {
                src: ['.build']
            },
            scripts: {
                src: ['scripts/common.js']
            }
        },
        cssmin: {
            options: {
                keepSpecialComments:1
            },
            minify: {
                expand: true,
                cwd: 'styles/_src',
                src: ['*.css', '**/*.css'],
                dest: 'styles/',
                ext: '.css'
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        copy: {
            main: {
                src: 'styles/_src/**',
                dest: 'styles/'
            }
        },
        watch: {
            css: {
                files: ['styles/_src/*.css', 'styles/_src/**/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['scripts/_src/*.js', 'scripts/_src/**/*.js'],
                tasks: ['uglify']
            },
            options: {
                spawn: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // img mini

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    // Default task.

    grunt.registerTask('json-test', ['jshint', 'qunit']);
    grunt.registerTask('json-uglify', ['uglify']);
    grunt.registerTask('json-cssmin', ['cssmin']);
    grunt.registerTask('json-copy', ['copy']);
    grunt.registerTask('json-watch', ['watch']);
    grunt.registerTask('json-clean', ['clean']);
    grunt.registerTask('json-jshint', ['jshint']);
    grunt.registerTask('build', ['cssmin', 'uglify', 'clean']);

    //grunt.registerTask('build', ['jshint', 'qunit', 'uglify', 'cssmin', 'clean']);

    


};
