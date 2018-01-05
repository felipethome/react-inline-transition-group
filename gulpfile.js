/*eslint-disable no-console */

var browserify = require('browserify');
var connect = require('gulp-connect');
var merge = require('merge-stream');
var notify = require('gulp-notify');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var files = {
  deploy: [
    'demo/index.html',
    'demo/404.html',
    'demo/img/**',
    'demo/styles/**',
  ],

  dependencies: [
    'react',
    'react-dom',
    'react-addons-transition-group',
    'react-addons-css-transition-group',
  ],

  browserify: [
    './demo/main.js',
  ],
};

var browserifyTask = function (options) {
  var bundler = browserify({
    entries: [options.src],
    transform: [
      ['babelify', {
        presets: ['es2015', 'stage-2', 'react'],
        plugins: ['transform-class-properties'],
      }],
    ],
    debug: options.development,
    cache: {}, // Requirement of watchify
    packageCache: {}, // Requirement of watchify
    fullPaths: options.development,
    alias: ['/node_modules/react/react.js:react'],
    extensions: ['.js', '.jsx', '.json'],
  });

  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    return bundler
      .bundle()
      .on('error', gutil.log)
      .pipe(source(options.output))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, connect.reload()))
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  bundler.external(files.dependencies);

  if (options.development) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  return rebundle();
};

var browserifyDepsTask = function (options) {
  var vendorsBundler = browserify({
    debug: options.development,
    require: files.dependencies,
  });

  var start = new Date();
  console.log('Building VENDORS bundle');
  return vendorsBundler
    .bundle()
    .on('error', gutil.log)
    .pipe(source(options.output))
    .pipe(gulpif(!options.development, streamify(uglify())))
    .on('error', gutil.log)
    .pipe(gulp.dest(options.dest))
    .pipe(notify(function () {
      console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
    }));
};

gulp.task('ghpages', ['deploy'], function () {
  return gulp.src('./demo/deploy/**/*')
    .pipe(ghPages());
});

gulp.task('deploy', function () {
  process.env.NODE_ENV = 'production';

  var browserifyDepsOpt = {
    development: false,
    src: files.dependencies,
    output: 'vendors.js',
    dest: './demo/deploy/build/scripts',
  };

  var browserifyOpt = {
    development: false,
    src: files.browserify,
    output: 'bundle.js',
    dest: './demo/deploy/build/scripts',
  };

  var copyFiles = gulp.src(files.deploy, {base: './demo'})
    .on('error', gutil.log)
    .pipe(gulp.dest('./demo/deploy'));

  return merge(
    copyFiles,
    browserifyDepsTask(browserifyDepsOpt),
    browserifyTask(browserifyOpt)
  );
});

gulp.task('dev', function () {
  process.env.NODE_ENV = 'development';

  var browserifyDepsOpt = {
    development: true,
    src: files.dependencies,
    output: 'vendors.js',
    dest: './demo/build/scripts',
  };

  var browserifyOpt = {
    development: true,
    src: files.browserify,
    output: 'bundle.js',
    dest: './demo/build/scripts',
  };

  var serverOpt = {
    root: './demo',
    port: 8080,
    livereload: true,
    fallback: './demo/index.html',
  };

  connect.server(serverOpt);

  return merge(
    browserifyDepsTask(browserifyDepsOpt),
    browserifyTask(browserifyOpt)
  );
});