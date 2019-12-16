
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('test', function(){
	return gulp.src('test/tests*.js').pipe(mocha());
});

gulp.task('lint-src', function() {
	return gulp.src('./*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('lint-test', function() {
	return gulp.src('./test/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

exports.lint = gulp.series('lint-src','lint-test'); 
