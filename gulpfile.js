"use strict";

// /home/sijan/workspace/LingoHop/lingohop/lingohop/static/node_modules
var gulp = require('./lingohop/static/node_modules/gulp');
var connect = require('./lingohop/static/node_modules/gulp-connect'); // Runs a local dev server
var connect = require('./lingohop/static/node_modules/gulp-open'); // Runs a local dev server
// var open = require('gulp-open'); // Open a URL in a web browser

// configure browserify
var browserify = require('./lingohop/static/node_modules/browserify'); // Bundles JS
var reactify = require('./lingohop/static/node_modules/reactify'); // Transforms React JSX to JS
var source = require('./lingohop/static/node_modules/vinyl-source-stream'); // use conventional text steams with Gulp

// css
var concat = require('./lingohop/static/node_modules/gulp-concat'); // concatenates files

// lint

var lint = require('./lingohop/static/node_modules/gulp-eslint'); // Lint JS files, including JSX

var config = {

	port: 9005,
	devBaseUrl: "http:localhost",
	paths: {
		html: './src/*.html',
		js: './src/**/.js',
		css:[
			'bootstrap/dist/css/bootstrap.min.css',
			'bootstrap/dist/css/bootstrap-theme.min.css'

		],
		dist: './dist',
		mainJs : './src/main.js'
	}
}
// start a local development server

// let's define a function called 'connect'
// gulp.task('connect', function(){

// 	connect.server({
// 		root : ['dist'],
// 		port : config.port,
// 		base : config.devBaseUrl,
// 		livereload : true
// 	});
// });


// // let's define a function 'open' which depends on 'connect' : so ['connect']
// // executes first 
// gulp.task('open',['connect'], function(){
// // go get index.html and open it in the url
// 	gulp.src('dist/index.html')
// 		.pipe(open({ uri : config.devBaseUrl + ":" + config.port + '/'}))
// });

// dest : file to land
// when land to dist : reload
gulp.task('html', function(){
    gulp.src(config.paths.html)
    	.pipe(gulp.dest(config.paths.dist))
    	
});



// transform jsx to js
// bundle all js file to single file
// destination under scripts folder

gulp.task('js', function(){
   browserify(config.paths.mainJs)
   			.transform(reactify)
   			.bundle()
   			.on('error', console.error.bind(console))
   			.pipe(source('bundle.js'))
   			.pipe(gulp.dest(config.paths.dist + '/scripts'))
});	


// step 3.
gulp.task('css', function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function(){
		return gulp.src(config.paths.js)
			.pipe(lint({config: 'eslint.config.json'}))
			.pipe(lint.format());
});	

gulp.task('runServer', function() {
  exec('python manage.py runserver', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});		

// watching html paths
// anytime changes called the 'html' task
gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html'])
	gulp.watch(config.paths.js, ['js', 'lint'])
});

// when I type gulp on command line it will
// execute html and open tasks
gulp.task('default', ['html', 'js','css','lint', 'runServer', 'watch' ]);



// Watch Files For Changes & Reload, the default task
// gulp.task('default', ['styles', 'jshint', 'coffeelint', 'scripts', 'runserver'], function () {
//   browserSync({
//     notify: false,
//     proxy: "127.0.0.1:8000"
//   });

//   gulp.watch(['app/**/*.html'], reload);
//   gulp.watch(['app/static/styles/**/*.{scss,css}'], ['styles', reload]);
//   gulp.watch(['app/static/scripts/**/*.js'], ['jshint']);
//   gulp.watch(['app/static/scripts/**/*.coffee'], ['coffeelint']);
//   gulp.watch(['app/static/scripts/**/*.{js,coffee}'], ['scripts', reload]);
//   gulp.watch(['app/static/images/**/*'], reload);
// });