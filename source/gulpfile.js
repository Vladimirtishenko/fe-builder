"use strict";

const gulp = require('gulp'),
	  jade = require('gulp-jade'),
	  prettify = require('gulp-html-prettify');


gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    return gulp.src('./public/jade/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(prettify({indent_char: ' ', indent_size: 3}))
        .pipe(gulp.dest('./'))
})


gulp.task('watch', function() {
    gulp.watch("./public/jade/**/*.jade", ['jade']);
});