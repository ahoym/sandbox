'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var path = require('path');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var watchify = require('watchify');

var paths = {
  ASSETS: [
    'src/assets/img/**/*'
  ],
  DEV: 'dev',
  DEV_SRC: 'dev/src',
  ENTRY_POINTS: [
    'src/js/app.js'
  ],
  HTML: 'src/index.html',
  OUT: 'bundle.js',
  SASS: 'src/sass/**/*.scss'
};


gulp.task('connect', function () {
  connect.server({
    root: 'dev/',
    livereload: true
  });
});

gulp.task('copy', function () {
  gulp.src(paths.HTML)
    .pipe(gulp.dest(paths.DEV))
    .pipe(connect.reload());
});

gulp.task('copyAssets', function () {
  var distAssets = path.join(paths.DEV_SRC, 'assets');

  return gulp.src(paths.ASSETS, { base: 'src/assets/' })
    .pipe(gulp.dest(distAssets))
    .pipe(connect.reload());
});

var buildBundle = function() {
  var jsDest = path.join(paths.DEV_SRC, 'js');

  return bundle.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(paths.OUT))
    .pipe(gulp.dest(jsDest))
    .pipe(connect.reload());
};

var bundle = watchify(browserify({
  entries: paths.ENTRY_POINTS,
  transform: [babelify, reactify],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

gulp.task('buildJs', buildBundle);
bundle.on('update', buildBundle);
bundle.on('log', gutil.log);

gulp.task('sass', function () {
  var cssDest = path.join(paths.DEV_SRC, 'css');

  gulp.src(paths.SASS)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
    .pipe(connect.reload());
});

gulp.task('watch', ['copy', 'copyAssets', 'buildJs', 'sass'], function () {
  gulp.watch(paths.ASSETS, ['copyAssets']);
  gulp.watch(paths.HTML, ['copy']);
  gulp.watch(paths.SASS, ['sass']);
});

gulp.task('default', ['connect', 'watch']);
