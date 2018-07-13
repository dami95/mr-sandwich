var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('sass', () => {
    return gulp.src('scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'))
});

gulp.task('js', () => {
    //@TODO there should be jslint also
    gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./'))
        .on('end', () => {
            gulp.start('js-minify');
        });
});

gulp.task('js-minify', () => {
    gulp.src('main.js')
        .pipe(minify())
        .pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('js/*.js', ['js']);
});

gulp.task('compile', ['sass', 'js']);