const { src, dest, watch, task, series } = require('gulp');
const uglify = require('gulp-uglify');
const compass = require('gulp-compass');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const del = require('del');

function clean(cb) {
    del('./dist/*');
    cb();
}

function scripts(cb) {
    src('src/*.js')
        .pipe(
            dest('./dist')
        )
        .pipe(
            rename({ suffix: '.min' })
        )
        .pipe(
            uglify()
        ).pipe(
            dest('./dist')
        );
    cb();
}

function styles(cb) {
    src('./src/*.scss')
        .pipe(
            compass({
                css: './dist',
                sass: './src',
                image: './src/images',
                generated_images_path: './dist/sprites'
            })
        ).pipe(
            minifycss()
        ).pipe(
            rename({ suffix: '.min' })
        ).pipe(
            dest('./dist')
        );
    cb();
}

function gulpWatch(cb) {
    watch('./src/*', scripts);
    watch('./src/*', styles);
    cb();
}

function compassWatch(cb) {
    watch('./src/*.scss', compass);
    watch('./src/*.scss', styles);
    cb();
}

function scriptsWatch(cb) {
    watch('./src/*.js', scripts);
    cb();
}

exports.scripts = scripts;
exports.scripts = styles;
exports.watch = gulpWatch;
exports.compassWatch = compassWatch;
exports.scriptsWatch = scriptsWatch;
exports.default = series(clean, scripts);
