"use strict";

const gulp = require('gulp'),
      pug = require('gulp-pug'),
      rename = require('gulp-rename'),
      imagemin = require('gulp-imagemin');
 
gulp.task('pug', function () {
  return gulp.src('./public/pug/*.pug')
  .pipe(pug(
      {
        pretty: true,
        data: {
          base_path: ''
        }
      }
  ))
  .pipe(gulp.dest('./'));
});

gulp.task('prod', function () {
  return gulp.src('./public/pug/*.pug')
  .pipe(pug({
        data: {
          base_path: '/',
          client: true
        }
    }))
  .pipe(rename((path) => {
      path.extname = ".php"
   }))
  .pipe(gulp.dest('./frameworks/app/view'));
});

gulp.task('img', () =>
    gulp.src('public/img/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('public/img/'))
);


gulp.task('default', function() {
    gulp.watch("./public/pug/**/*.pug", ['pug']);
    gulp.watch("./public/img/*.+(jpg|png|gif|jpeg)", ['img']);
});