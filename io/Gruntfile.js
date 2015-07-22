module.exports = function(grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['uglify']
            }
        },

		compass: {
			init: {
				options: {
					watch: true,
					sassDir: "scss/",
					cssDir: "css/",
					imagesDir: "img/",
					spriteLoadPath: 'img/',
					fontsDir: "css/fonts/",
					javascriptsDir: "js/",
					outputStyle: "compressed"
				}
			}
		},

		uglify: {
			options: {
				preserveComments: 'all',
			},
			init: {
				files: {
					'js/all.js': ['js/io/jquery-2.1.4.min.js', 'js/plugins/*.js', 'js/io/*.js']
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
};