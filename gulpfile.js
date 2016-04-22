"use strict";
const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const source = require('vinyl-source-stream');
const transform = require('vinyl-transform');
const webpack = require("webpack");
const gutil = require("gulp-util");
const webPackConfig = require('./webpack.config.js');
const gulpFilter = require('gulp-filter');

gulp.task('server', ['clean'], function () {
    const jsFilter = gulpFilter('**/*.js', {restore: true});
    return gulp.src('server/src/**')
        .pipe(jsFilter)
        .pipe(babel({
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0']
        }))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest('lib/'));
});

gulp.task('webpack', ['clean'], function (callback) {
    return webpack(webPackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('client-templates', ['clean'], function () {
    return gulp.src('client/src/**/*[.hbs, .html]')
        .pipe(gulp.dest('lib/public/'));
});

gulp.task('client', ['webpack', 'client-templates']);

gulp.task('clean', function (cb) {
    return del(['lib/*'], cb);
});

gulp.task('default', ['server', 'client']);