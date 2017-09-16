const gulp = require('gulp');
const csso = require('gulp-csso');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const rev = require('gulp-rev');
const webserver = require('gulp-webserver');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const stylus = require('gulp-stylus');
const wiredep = require('wiredep').stream;
const del = require('del');

gulp.task('clean', function() {
  return del(['dist', '.tmp']);
});

gulp.task('usemin', ['stylus'], function() {
  return gulp.src('./app/*.html')
    .pipe(usemin({
      css: [csso, rev],
      html: [function() {
        return htmlmin({
          collapseWhitespace: true
        });
      }],
      js: [
        function ()  {
          return sourcemaps.init({
            loadMaps: true
          })
        },
        uglify,
        rev,
        function () {
          return sourcemaps.write('./')
        }
      ],
      inlinejs: [uglify],
      inlinecss: [csso, 'concat']
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('stylus', function () {
  return gulp.src('./app/styles/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('imagemin', function () {
  gulp.src('app/images/**/*.{jpg,png,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('server', ['usemin'], function() {
  return gulp.src('./dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', ['usemin', 'imagemin'], function () {
  return gulp.watch('app/**/*.{js,styl,html}', ['usemin']);
});

gulp.task('default', ['usemin', 'imagemin', 'server', 'watch']);
