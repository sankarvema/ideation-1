module.exports = function(grunt){
  var paths =  {
    campaign:{
      html:[
        'public/app/campaign/*.html'
      ],
      js:[
        'server/campaign/*.js',
        'server.js',
        'public/app/campaign/*.js',
        'public/app/app.js'
      ],
      templates:[
        'server/shared/campaign.ejs'
      ]
    },
    user:{
      html:[
        'public/app/admin/*.html'
      ],
      js:[
        'server/user/*.js',
        'server.js',
        'public/app/admin/*.js',
        'public/app/app.js'
      ],
      templates:[
        'server/shared/user.ejs'
      ]
    }
  }  ;

  //initconfig Method defining Tasks 
grunt.initConfig(  {
     
    //JS linting 
    jshint:{
      campaignjs:{
        src:paths.campaign.js
      },
      campaignejs:{
        src:paths.campaign.ejs
      },
      userjs:{
        src:paths.user.js
      },
      userejs:{
        src:paths.user.ejs
      },
      main:{
        src:'public/app/main/mainModule.js'
      }
    },

    //concatinating files
    concat:{
      options:{
        separator:';',   
        dest: 'build/'   // Destination path prefix.
        },
      
        //campaign js and html concatination
      campaignhtml:{
          src:paths.campaign.html,
          dest:'dist/campaign/campaign.html'
        },
        campaignjs:{
          src:paths.campaign.js,
          dest:'dist/campaign/campaign.js'
        },
        //user js and html concatination
      userhtml:{
          src:paths.user.html,
          dest:'dist/user/user.html'
        },
        userjs:{
          src:paths.user.js,
          dest:'dist/user/user.js'
        },
        //css
      css:{
          src:'public/app/assets/styles/*.css',
          dest:'dist/css/ideation.css'
        },
        //main html
       main:{
          src:'public/app/main/*.html',
          dest:'dist/main/main.html'
        },
      
    },

    //js files minification
    uglify:{
      campaignjs:{
        src:'dist/campaign/campaign.js',
        dest:'dist/campaign/campaign.js'
      },
      userjs:{
        src:'dist/user/user.js',
        dest:'dist/user/user.js'
      },
      mainjs:{
        src:'public/app/main/mainModule.js',
        dest:'dist/main/mainModule.js'
      }
    },


    //html files minification
    htmlmin:{
      options:{ 
        removeComments:true,
        collapseWhitespace:true
      },
      campaignhtml:{
        src:'dist/campaign/campaign.html',
        dest:'dist/campaign/campaign.html'
      },
      userhtml:{
        src:'dist/user/user.html',
        dest:'dist/user/user.html'
      },
      mainhtml:{
        src:'dist/main/main.html',
        dest:'dist/main/main.html'
      }
    },

    //css minification
    cssmin:{
      options:{
        shorthandCompacting:false,
        roundingPrecision:-1
      },
      css:{
        src:'dist/css/ideation.css',
        dest:'dist/css/ideation.css'
      }
    }

  }  );  //initconfig closed


//Loading of tasks 
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-cssmin');


//registering tasks
grunt.registerTask('lint',
  [
    'jshint'
  ]  );
grunt.registerTask('default',
  [
    'concat',
    'uglify',
    'htmlmin',
    'cssmin'
  ]  );
};