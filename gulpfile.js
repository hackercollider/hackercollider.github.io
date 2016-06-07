var gulp = require('gulp');
var less = require('gulp-less');
var csscomb = require('gulp-csscomb');
var uncss = require('gulp-uncss');
var cleanCSS = require('gulp-clean-css');
var critical = require('critical');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Compiling the CSS from less
gulp.task('less', function () {
    return gulp.src('./less/hacker-collider.less')
        .pipe(less())
        .pipe(gulp.dest('./css'));
});

// Sorting the CSS
gulp.task('styles', ['less'], function () {
    return gulp.src('./css/hacker-collider.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./css/combed'));
});

// Removing unused classes in CSS
gulp.task('uncss', ['styles'], function () {
    return gulp.src('./css/combed/hacker-collider.css')
        .pipe(uncss({
            html: ['./_site/**/*.html'],
            ignore: [/fp/],
            timeout: 1000
        }))
        .pipe(gulp.dest('./css/uncss/'));
});

// Removeing tabs and spaces in CSS
gulp.task('minify-css', ['uncss'], function () {
    return gulp.src('./css/uncss/hacker-collider.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./css'));
});

// Estracting the critical path CSS
gulp.task('critical', ['minify-css'], function () {
    return critical.generate({
        base: '_site/',
        src: 'index.html', // Extract critical path CSS for index.html
        css: ['./css/hacker-collider.css'],
        dest: './_includes/critical.css',
        minify: true,
        include: [/cc_/],
        ignore: ['@font-face']
    });
});

// Uglify JS
gulp.task('uglify', function () {
    return gulp.src('./js/hacker-collider.js')
        .pipe(uglify())
        .pipe(rename('hacker-collider.min.js'))
        .pipe(gulp.dest('./js'));
});

// Run all the tasks above in the following fixed sequence
gulp.task('css', ['less', 'styles', 'uncss', 'minify-css', 'critical']);
gulp.task('js', ['uglify']);
gulp.task('default', ['css', 'js']);
