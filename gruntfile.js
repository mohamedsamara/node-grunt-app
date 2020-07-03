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
            dest: 'dist/public'
          },
          {
            expand: true,
            cwd: 'src/views',
            src: ['**'],
            dest: 'dist/views'
          }
        ]
      }
    },
    sass: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/sass',
            src: '**/*.scss',
            dest: 'dist/public/css',
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
            cwd: 'dist/public/css',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/public/css',
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
    },
    nodemon: {
      dev: {
        script: 'dist/index.js'
      },
      options: {
        ignore: ['node_modules/**', 'gruntfile.js'],
        env: {
          PORT: '8080'
        }
      }
    },
    concurrent: {
      watchers: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    watch: {
      ts: {
        files: ['src/**/*.ts'],
        tasks: ['ts']
      },
      sass: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass']
      },
      views: {
        files: ['src/views/**/*.pug'],
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  if (process.env.NODE_ENV == 'production') {
    grunt.registerTask('default', ['ts', 'sass', 'copy', 'cssmin']);
  } else {
    grunt.registerTask('default', [
      'ts',
      'sass',
      'copy',
      'concurrent:watchers'
    ]);
  }
};
