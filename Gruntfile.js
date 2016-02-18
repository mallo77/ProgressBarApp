module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  //include only the required vendor libraries
  var jsVendor = [
    'bower_components/foundation/js/vendor/jquery.js',
    'bower_components/handlebars/handlebars.js'
  ];

  //include only the required foundation libraries
  var jsFoundation = [
    'bower_components/foundation/js/foundation/foundation.js' 
  ];

  //include all custom javascript files
  var jsApp = [
    'js/jquery.hbsRenderTmpl.js',
    'js/jquery.progressBarUI.js',
    'js/app.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false,
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        jsApp
      ]
    },

    uglify: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'js/libs/vendor.min.js': [jsVendor],
          'js/libs/foundation.min.js': [jsFoundation],
          'js/libs/app.min.js': [jsApp]
        }
      }
    },

    clean: {
      js: [
        'js/libs/'
      ]
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },

      js: {
        files: [
          jsVendor,
          jsFoundation,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      },

      livereload: {
        options: {
          livereload: true
        },
        files: [
          'js/app.min.js',
          'css/app.css'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', [
    'clean',
    'jshint', 
    'uglify',
    'sass'
  ]);
  
  grunt.registerTask('default', [
    'build',
    'watch'
  ]);
};