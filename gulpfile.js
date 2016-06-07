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
        .pipe(gulp.dest('./dist/css'));
});

// Sorting the CSS
gulp.task('styles', ['less'], function () {
    return gulp.src('./dist/css/hacker-collider.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./dist/css'));
});

// Removing unused classes in CSS
gulp.task('uncss-main', ['styles'], function () {
    return gulp.src('./dist/css/hacker-collider.css')
        .pipe(uncss({
            html: ['./_site/**/*.html'],
            ignore: [/fp/]
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('uncss-bootstrap', ['styles'], function () {
    return gulp.src('./css/bootstrap.css')
        .pipe(uncss({
            html: ['./_site/**/*.html'],
            ignore: [/fp/]
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-rest-css', ['styles'], function () {
    return gulp.src('./css/syntax.css')
        .pipe(gulp.dest('./dist/css'));
});

// Removeing tabs and spaces in CSS
gulp.task('minify-css', ['uncss-main', 'uncss-bootstrap', 'copy-rest-css'], function () {
    return gulp.src('./dist/css/**/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});

// Estracting the critical path CSS
gulp.task('critical', ['minify-css'], function () {
    return critical.generate({
        base: '_site/',
        src: 'index.html', // Extract critical path CSS for index.html
        css: ['./dist/css/bootstrap.css', './dist/css/hacker-collider.css', './dist/css/syntax.css'],
        dest: './_includes/critical.css',
        minify: true,
        include: [/cc_/],
        ignore: ['@font-face']
    });
});

// Uglify JS
gulp.task('uglify', function () {
    return gulp.src('./js/**/*.js')
        .pipe(uglify())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'));
});

// Run all the tasks above in the following fixed sequence
gulp.task('css', ['less', 'styles', 'uncss-main', 'uncss-bootstrap', 'copy-rest-css', 'minify-css', 'critical']);
gulp.task('js', ['uglify']);
gulp.task('default', ['css', 'js']);
