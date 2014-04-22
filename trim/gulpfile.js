var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

var paths = {
  scripts: ['app/js/app.js'],
  scss: ['app/css/style.scss']
};

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('sass', function () {
    gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});

gulp.task('connect', function() {
  connect.server({root:'app'});
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.scss, ['sass']);
});

gulp.task('default', ['connect', 'watch', 'lint', 'sass']);
