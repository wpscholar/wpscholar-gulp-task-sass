'use strict';

var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var minify = require('gulp-minify-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var size = require('gulp-size');
var sound = require('mac-sounds');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function (config) {

    return function () {

        return gulp.src(config.src)
            .pipe(plumber({
                errorHandler: function (err) {
                    sound('blow');
                    console.log(err);
                }
            }))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.dest))
            .pipe(notify(function () {
                sound('tink');
            }))
            .pipe(size({showFiles: true}))
            .pipe(minify())
            .pipe(rename(function (path) {
                path.basename += ".min"
            }))
            .pipe(gulp.dest(config.dest))
            .pipe(size({showFiles: true}));

    };

};