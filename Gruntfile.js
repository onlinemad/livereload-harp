'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  // Project configuration.
  grunt.initConfig({
    nodemon: {
      src: {
        script: 'app.js',
        options: {
          args: ['development'],
          nodeArgs: ['--debug'],
          ignore: ['*.md', 'node_modules/**'],
          ext: 'js',
          watch: ['lib', 'routes', 'views'],
          delayTime: 1,
          env: {
            PORT: '9000'
          },
          cwd: __dirname
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      file: {
        files: ['**/*.jade', '**/*.html', '**/*.css', '**/*.js', '**/*.sass', '!node_modules/**/*'],
        tasks: 'compass'
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['compass', 'nodemon:src', 'watch']
    }
  });
  grunt.option('force', true);
  grunt.registerTask('default', ['concurrent:dev']);
};