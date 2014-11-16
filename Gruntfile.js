'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-nodemon');
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
    watch: {
      options: {
        livereload: true,
      },
      file: {
        files: ['**/*.jade', '**/*.html', '**/*.css', '**/*.js', '!node_modules/**/*']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['nodemon:src', 'watch']
    }
  });
  grunt.registerTask('default', ['concurrent:dev']);
};