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

gulp.task('server', ['clean'], function () {
    return gulp.src('server/**')
        .pipe(babel({
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0']
        }))
        .pipe(gulp.dest('lib/server'));
});

gulp.task("webpack", function(callback) {
    webpack(webPackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('client-templates', ['clean'], function () {
    return gulp.src('client/src/**/*[.hbs, .html]')
        .pipe(gulp.dest('lib/server/src/public/'));
});

gulp.task('client', ['clean', 'webpack', 'client-templates']);

gulp.task('clean', function (cb) {
    return del(['lib/server/src/public/*'], cb);
});

gulp.task('default', ['server', 'client']);