'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

function defaultTask(cb)
{
	console.log('Hello task');
	cb();
}

gulp.task('test', function(){
	return gulp.src('test/tests*.js').pipe(mocha());
});

exports.default = defaultTask;