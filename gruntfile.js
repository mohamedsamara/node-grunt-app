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
            dest: 'dist/public/css',
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
      pug: {
        files: ['src/**/*.pug'],
        tasks: ['pug']
      },
      sass: {
        files: ['src/sass/**/*.sass'],
        tasks: ['sass']
      },
      copy: {
        files: ['src/public/**'],
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  if (process.env.NODE_ENV == 'production') {
    grunt.registerTask('default', ['ts', 'pug', 'sass', 'copy', 'cssmin']);
  } else {
    grunt.registerTask('default', [
      'ts',
      'pug',
      'sass',
      'copy',
      'concurrent:watchers'
    ]);
  }
};
