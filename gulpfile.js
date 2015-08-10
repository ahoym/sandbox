'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var connect = require('gulp-connect');
var path = require('path');
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

var buildBundle = function(bsfyInstance) {
  var jsDest = path.join(paths.DEV_SRC, 'js');

  return bsfyInstance.bundle()
    .pipe(source(paths.OUT))
    .pipe(gulp.dest(jsDest))
    .pipe(connect.reload());
};

gulp.task('watch', ['copy'], function () { 
  var updateCount = 0;
  var watcher = watchify(browserify({
    entries: paths.ENTRY_POINTS,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));
  
  watcher.on('update', function () {
    updateCount += 1;
    console.log('Javascript files update', updateCount);
    buildBundle(watcher);
  });

  gulp.watch(paths.HTML, ['copy']);
  return buildBundle(watcher);
});

gulp.task('default', ['connect', 'watch']);

