module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          "build/css/main.css": "src/less/main.less",
        }
      }
    },
    postcss: {
      options: {
        map: true, 
        processors: [
          require('pixrem')(),
          require('autoprefixer')({
            browsers: 'last 2 versions'
          }),
          require('cssnano')()
        ]
      },
      dist: {
          files: {
              'build/css/main.min.css' : 'build/css/main.css' 
          }
      }
    },
    uglify: {
        main: {
            options: {
                sourceMap: true,
                sourceMapName: 'build/js/main.map'
            },
            files: {
                'build/js/main.min.js': ['src/js/_mobiledetect.js','src/js/_mobiledetect.modernizr.js','src/js/_adaptive.js','src/js/main.js']
                
            }
        }
    },
    jade: {
        compile: {
            options: {
                client: false,
                pretty: true,
                debug: true
            },
            files: {
                "build/index.html": ["src/jade/index.jade"]
            }
        }
    },
    watch: {
      styles: {
        files: ['src/less/**/*.less'],
        tasks: ['less','postcss'],
        options: {
          nospawn: true
        }
      },
      scripts:{
          files: ['src/js/**/*.js'],
          tasks: ['uglify'],
      },
      src:{
        files: ['src/jade/**/*.jade'], // which files to watch
        tasks: ['jade'],
      }
    }
  });

  grunt.registerTask('default', ['jade','less','uglify','postcss', 'watch']);
};
