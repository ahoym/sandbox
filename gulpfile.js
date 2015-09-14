'use strict';

const babelify = require('babelify');
const browserify = require('browserify');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const connect = require('gulp-connect');
const path = require('path');
const reactify = require('reactify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const watchify = require('watchify');

const paths = {
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
// dev directory by default
const destinationDir = paths.DEV;

const bundle = watchify(browserify({
  entries: paths.ENTRY_POINTS,
  transform: [ babelify, reactify ],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

const buildBundle = function () {
  let jsDest = path.join(paths.DEV_SRC, 'js');

  return bundle.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(paths.OUT))
    .pipe(gulp.dest(jsDest))
    .pipe(connect.reload());
};

bundle.on('update', buildBundle);
bundle.on('log', gutil.log);


gulp.task('buildCss', function () {
  let cssDest = path.join(paths.DEV_SRC, 'css');

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
  let distAssets = path.join(paths.DEV_SRC, 'assets');

  return gulp.src(paths.ASSETS, { base: 'src/assets/' })
    .pipe(gulp.dest(distAssets))
    .pipe(connect.reload());
});

gulp.task('test', shell.task([
  'npm test'
]));

// Replace with gulp.series tasks when gulp 4 is complete
gulp.task('build', [ 'clean' ], function () {
  return gulp.start('copy', 'copyAssets', 'buildJs', 'buildCss');
});

gulp.task('watch', [ 'build' ], function () {
  let jsFiles = [
    'src/js/**/*.js',
    '__tests__/**/*-test.js'
  ];

  gulp.watch(paths.ASSETS, [ 'copyAssets' ]);
  gulp.watch(paths.HTML, [ 'copy' ]);
  gulp.watch(jsFiles, [ 'test' ]);
  gulp.watch(paths.SASS, [ 'buildCss' ]);
});

gulp.task('dev', [ 'connect', 'watch' ]);
