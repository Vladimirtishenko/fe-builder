"use strict";

const gulp = require('gulp'),
      pug = require('gulp-pug'),
      prettify = require('gulp-html-prettify');
 
gulp.task('pug', function () {
  return gulp.src('./public/pug/*.pug')
  .pipe(pug())
  .pipe(prettify({indent_char: ' ', indent_size: 4}))
  .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
    gulp.watch("./public/pug/**/*.pug", ['pug']);
});