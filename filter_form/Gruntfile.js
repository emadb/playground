module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["tmp", "build"],
    sass: {
      dev:{
        files: {
          'app/css/style.css': 'app/css/style.scss'
        }
      },  
      prod: {
        files: {
          'tmp/css/style.css': 'app/css/style.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'app/js/jquery-1.10.2.js', 
          'app/js/angular.min.js', 
          'app/js/angular-sanitize.min.js',
          'app/js/lodash.compat.js', 
          'app/js/app.js'],
        dest: 'tmp/js/app.js',
      },
    },
    uglify: {
      prod:{
        options: {},
        files: {
          'tmp/js/app.min.js': ['tmp/js/app.js']
        }  
      }
    },
    cssmin: {
      combine: {
        files: {
          'tmp/css/style.min.css': ['tmp/css/style.css']
        }
      }
    },
    useminPrepare: {
      html: ['tmp/index.html']
    },
    usemin: {
      html: ['tmp/index.html'],
      css: [],
      options: {
        assetsDirs: ['js', 'css']
      }
    },
    connect: {
      prod: {
        options: {
          keepalive: true,
          port: 3000,
          base: 'build'
        }
      },
      dev: {
        options: {
          port: 3000,
          base: 'app'
        }
      }
    },
    jshint: {
      all: ['app/js/app.js']
    },
    copy: {
      tmp: {
        files: [
          {
            src: ['*.html', 'css/*.css', 'fonts/*', 'json-data/*', 'img/*'], 
            expand: true, 
            dest: 'tmp/', 
            filter: 'isFile', 
            cwd: 'app/'
          }
        ]
      },
      prod: {
        files: [
          {
            src: ['*.html', 'js/*.min.js', 'css/*.min.css', 'fonts/*', 'json-data/*', 'img/*'], 
            expand: true, 
            dest: 'build/', 
            filter: 'isFile', 
            cwd: 'tmp/'
          }
        ]
      }
    },
    watch: {
      scripts: {
        files: ['app/js/*.js', 'app/css/*.scss', 'app/index.html'],
        tasks: ['sass', 'jshint'],
        options: {
          spawn: false,
        },
      },
      express: {
        files: ['app.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false,
        }
      }
    },
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'app.js'
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'sass:dev', 'express:dev', 'connect:dev', 'watch']);
  grunt.registerTask('prod', ['clean', 'jshint', 'sass:prod', 'concat', 'uglify:prod', 'cssmin', 'copy:tmp', 'useminPrepare', 'usemin', 'copy:prod']);

};