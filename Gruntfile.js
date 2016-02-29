module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  //include only the required foundation libraries
  var jsFoundation = [
    'bower_components/foundation/js/foundation/foundation.js' 
  ];


  //include only the required vendor libraries
  var jsVendor = [
    'bower_components/foundation/js/vendor/jquery.js',
    'bower_components/handlebars/handlebars.js'
  ];

  var reactjsVendor = [
    'node_modules/react/dist/react.js'
  ];

  var ractivejsVendor = [
    'node_modules/ractive/ractive.js'
  ];


  //include all custom javascript files
  var jsApp = [
    'js/jquery/jquery.hbsRenderTmpl.js',
    'js/jquery/jquery.progressBarUI.js',
    'js/jquery/app.js'
  ];

  var reactjsApp = [
    'js/reactjs/*.js'
  ];

  var ractivejsApp = [
    'js/ractivejs/*.js'
  ];  

  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    react: {
      files: {
        expand: true,
        cwd: 'tmpl',
        src: ['**/*.jsx'],
        dest: 'js/reactjs',
        ext: '.js'
      }
    },

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
        jsApp,
        reactjsApp,
        ractivejsApp
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
          'js/libs/app.min.js': [jsApp],
          'js/libs/reactjs-vendor.min.js': [reactjsVendor],
          'js/libs/reactjs-app.min.js': [reactjsApp],
          'js/libs/ractivejs-vendor.min.js': [ractivejsVendor],
          'js/libs/ractivejs-app.min.js': [ractivejsApp]
        }
      }
    },

    clean: {
      js: [
        'js/libs/',
        'js/reactjs'
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
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('build', [
    'clean',
    'jshint',
    'react',
    'uglify',
    'sass'
  ]);
  
  grunt.registerTask('default', [
    'build',
    'watch'
  ]);
};