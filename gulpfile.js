"use strict";
const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('server', ['clean'], function () {
    return gulp.src('server/**')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('lib/server'));
});

gulp.task('client', ['clean'], function () {
    return gulp.src('client/src/**')
            .pipe(gulp.dest('lib/server/src/views/'));
});

gulp.task('clean', function(cb) {
    return del(['lib/*'], cb);
});

gulp.task('default', ['server', 'client']);