module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    includePaths: require('node-bourbon').includePaths,
                    includePaths: require('node-neat').includePaths
                },
                files: {
                    'public/css/style.css': 'public/scss/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass', 'concat', 'cssmin']
            },
            js: {
                files: ['public/js/*.js'],
                tasks: ['concat', 'uglify', 'jshint']
            }
        },
        harp: {
            server: {
                server: true,
                port: 9000
            },
            dist: {}
        },
        jshint: {
            all: {
                src: 'public/js/main.js'
            }
        },
        concat: {
            js: {
                src: 'public/js/*.js',
                dest: 'public/dist/main.js'
            },
            css: {
                src: 'public/css/*.css',
                dest: 'public/dist/main.css'
            }
        },
        uglify: {
            dist: {
                src: 'public/dist/main.js',
                dest: 'public/dist/main.min.js'
            }
        },
        cssmin: {
            css: {
                src: 'public/dist/main.css',
                dest: 'public/dist/main.min.css'
            }
        },
        concurrent: {
            default: ['harp', 'watch', 'jshint'],
            options: {
                logConcurrentOutput: true,
                limit: 4
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['sass', 'concat', 'uglify', 'cssmin', 'concurrent:default'])
}
