// Déclaration d'un module compatible avec requirejs.
module.exports = function(grunt) {
	// Définition de la configuration globale de grunt et des tâches exécutables.
	grunt.initConfig({
		// Config globale de Grunt
		pkg: grunt.file.readJSON('package.json'),
		// Config de chaque plugin
		cssmin: {
			app: {
				files: {
					'dist/app.min.css': ['css/*.css']
				}
			}
		},
		concat: {
			app: {
		      src: [
		    	'app/app.module.js',
		    	'app/*.component.js',
		    	'app/*.controller.js'
		      ],
		      dest: 'dist/app.js'
		    }
		},
		watch: {
			cssSrc: {
				files: ['css/*.css'],
				tasks: ['cssmin:app']
			},
			jsSrc: {
				files: ['app/*.js'],
				tasks: ['concat:app']
			}
		}
	});
	// Chargement des plugins.
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Déclaration des tâches éxécutables.
	grunt.registerTask('default', ['cssmin:app', 'concat:app']);
	grunt.registerTask('dev', ['watch']);
};