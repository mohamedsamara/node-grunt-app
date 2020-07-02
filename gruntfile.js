'use strict';

module.exports = grunt => {
  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/public',
            src: ['**'],
            dest: 'dist'
          }
        ]
      }
    },
    pug: {
      compile: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: [
          {
            src: '**/*.pug',
            cwd: 'src/views',
            dest: 'dist/views',
            expand: true
          }
        ]
      }
    },
    sass: {
      dist: {
        files: [
          {
            src: '**/*.scss',
            cwd: 'src/sass',
            dest: 'dist/css',
            expand: true,
            ext: '.css'
          }
        ]
      }
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'dist/css',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css',
            ext: '.css'
          }
        ]
      }
    },
    ts: {
      app: {
        files: [
          {
            src: ['src/**/*.ts', '!node_modules/**/*.ts'],
            dest: 'dist'
          }
        ],
        options: {
          module: 'commonjs',
          target: 'es6',
          sourceMap: false,
          rootDir: 'src'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['ts', 'pug', 'sass', 'cssmin', 'copy']);
};
