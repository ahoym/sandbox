'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var del = require('del');
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
var destinationDir = paths.DEV; //dev directory by default

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
bundle.on('update', buildBundle);
bundle.on('log', gutil.log);


gulp.task('buildCss', function () {
  var cssDest = path.join(paths.DEV_SRC, 'css');

  return gulp.src(paths.SASS)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
    .pipe(connect.reload());
});

gulp.task('buildJs', buildBundle);

gulp.task('clean', function () {
  return del([ destinationDir ]);
});

gulp.task('connect', function () {
  connect.server({
    root: 'dev/',
    livereload: true
  });
});

gulp.task('copy', function () {
  return gulp.src(paths.HTML)
    .pipe(gulp.dest(paths.DEV))
    .pipe(connect.reload());
});

gulp.task('copyAssets', function () {
  var distAssets = path.join(paths.DEV_SRC, 'assets');

  return gulp.src(paths.ASSETS, { base: 'src/assets/' })
    .pipe(gulp.dest(distAssets))
    .pipe(connect.reload());
});

// Replace with gulp.series tasks when gulp 4 is complete
gulp.task('build', ['clean'], function () {
  return gulp.start('copy', 'copyAssets', 'buildJs', 'buildCss');
});

gulp.task('watch', ['build'], function () {
  gulp.watch(paths.ASSETS, ['copyAssets']);
  gulp.watch(paths.HTML, ['copy']);
  // watchify already watches buildJs task
  gulp.watch(paths.SASS, ['buildCss']);
});

gulp.task('dev', ['connect', 'watch']);
