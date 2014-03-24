var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');


gulp.task('jshint', function(){
    gulp.src('./app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', function() {
   gulp.src('./test/*.js')
        .pipe(mocha({reporter: 'dot'}));
});

gulp.task('default', ['jshint', 'test'], function() {
});