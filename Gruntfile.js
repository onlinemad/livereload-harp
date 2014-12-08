'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-harp');
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
          sassDir: 'public/sass',
          cssDir: 'public/css'
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
    copy: {
      main: {
        src: ['**/*',  '!sass/**'],
        expand: true,
        cwd: 'public',
        dest: '.tmp',
      },
    },
    harp: {
      dist: {
        source: '.tmp',
        dest: 'www'
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
  grunt.registerTask('compile', ['compass', 'copy', 'harp']);
  // grunt.registerTask('compile', function() {
  //   grunt.task.run('compass');
  //   grunt.task.run('copy');
  //   grunt.util.spawn({
  //     cmd: 'harp',
  //     args: ['compile', '.tmp', 'www']
  //   });
  // });
};