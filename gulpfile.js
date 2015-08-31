'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var path = require('path');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var paths = {
  DEV: 'dev',
  DEV_SRC: 'dev/src',
  ENTRY_POINTS: [
    'src/js/app.js'
  ],
  HTML: 'src/index.html',
  OUT: 'bundle.js'
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
  transform: [reactify],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

gulp.task('buildJs', buildBundle);
bundle.on('update', buildBundle);
bundle.on('log', gutil.log);

gulp.task('watch', ['copy', 'buildJs'], function () {
  gulp.watch(paths.HTML, ['copy']);
});

gulp.task('default', ['connect', 'watch']);
