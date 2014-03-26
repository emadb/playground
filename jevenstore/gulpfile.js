var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');


gulp.task('jshint', function(){
    gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('spec', function() {
   gulp.src('./spec/*.js')
        .pipe(mocha({reporter: 'dot'}));
});

gulp.task('default', ['jshint', 'spec'], function() {
});