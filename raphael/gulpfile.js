var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var paths = {
  scripts: ['app/js/app.js'],
  scss: ['app/css/style.scss'],
  build: './build'
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

gulp.task('copy', function(){
  gulp.src(['./app/*.html']).pipe(gulp.dest(paths.build));
  gulp.src(['./app/js/*.js'])
    .pipe(gulp.dest(paths.build + '/js/'))
    .pipe(concat('all.min.js'));
  gulp.src(['./app/css/*.css']).pipe(gulp.dest(paths.build + '/css/'));
});

gulp.task('default', ['connect', 'watch', 'lint', 'sass']);
gulp.task('build', ['lint', 'sass', 'copy']);
