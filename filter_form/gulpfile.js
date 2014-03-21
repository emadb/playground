var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass')
var nodemon = require('gulp-nodemon')


gulp.task('lint', function() {
  return gulp.src('app/js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
    gulp.src('app/css/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});

gulp.task('server', function () {
  nodemon({ script: 'app.js', ext: 'html js' })
    .on('change', ['lint', 'sass'])
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('default', function() {
   gulp.start('lint', 'sass', 'server');
});