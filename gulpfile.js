"use strict";
const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const browserify = require('browserify');
const debowerify = require('debowerify');
const browserifyShim = require('browserify-shim');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const source = require('vinyl-source-stream');
const transform = require('vinyl-transform');

gulp.task('server', ['clean'], function () {
    return gulp.src('server/**')
        .pipe(babel({
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0']
        }))
        .pipe(gulp.dest('lib/server'));
});

gulp.task('client-js', ['clean'], function () {
    let bundler = browserify('./client/src/js/kamputerm.js');
    bundler.transform('debowerify').transform('browserify-shim');
    return bundler.bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./lib/server/src/public/'));
});

gulp.task('client-templates', ['clean'], function () {
    return gulp.src('client/src/**/*.html')
        .pipe(gulp.dest('lib/server/src/public/'));
});

gulp.task('client', ['clean', 'client-js', 'client-templates']);

gulp.task('clean', function (cb) {
    return del(['lib/*'], cb);
});

gulp.task('default', ['server', 'client']);