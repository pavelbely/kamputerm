"use strict";
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('server', function () {
    return gulp.src('server/**')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('lib/server'));
});

gulp.task('client', function () {
    return gulp.src('client/src/**')
            .pipe(gulp.dest('lib/server/src/views/'));
});

gulp.task('default', ['server', 'client']);