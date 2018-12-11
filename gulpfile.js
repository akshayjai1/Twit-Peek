var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))
  });
  // Compile SCSS
  gulp.task('cssCompile', function() {
    return gulp.src('./scss/**/*.scss')
      .pipe(sass.sync({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./css'))
  });

  // Minify CSS
  gulp.task('cssMinify', ['cssCompile'], function() {
    return gulp.src([
        './css/*.css',
        '!./css/*.min.css'
      ])
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
  });

  // CSS
  gulp.task('css', ['cssCompile', 'cssMinify']);

  // Minify JavaScript
  gulp.task('jsMinify', function() {
    return gulp.src([
        './js/*.js',
        '!./js/*.min.js'
      ])
      // .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./js'))
      .pipe(browserSync.stream());
  });

  // JS
  gulp.task('js', ['jsMinify']);

  // Default task
  gulp.task('default', ['css', 'js', 'vendor']);

  // Configure the browserSync task
  gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
  });

  // Dev task
  gulp.task('dev', ['css', 'js', 'browserSync'], function() {
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
    gulp.watch('./*.html', browserSync.reload);
  });
