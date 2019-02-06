const gulp     = require('gulp');
const sass     = require('gulp-sass');
const nunjucks = require('gulp-nunjucks-render');
const watch    = require('gulp-watch');
const minJs    = require('gulp-uglify');
const minCss   = require('gulp-clean-css');
const rename   = require("gulp-rename");
const clean    = require('gulp-clean');
const concat   = require('gulp-concat');

//Default task 
gulp.task('default', () => {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/scss/*.scss', ['sass']);
});
//Build HTML
gulp.task('html', () => {
  gulp.src("./src/index.html")
    .pipe(nunjucks())
    .pipe(gulp.dest("./dist"))
});
//Scss to css
gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minCss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'));
});
//img for prod
gulp.task('img', () => {
  return gulp.src('src/img/*')
    .pipe(gulp.dest('dist/img'));
});
//menu icons for prod
gulp.task('icons', () => {
  return gulp.src('src/menu_icons/*')
    .pipe(gulp.dest('dist/menu_icons'));
});
//Js for prod
gulp.task('minJs', () => {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(minJs())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});
//Remoove dist directory
gulp.task('clean', () => {
  return gulp.src('dist', {read: false})
    .pipe( clean());
});
//Build for prod
gulp.task('build', ['html', 'sass', 'minJs', 'img', 'icons']);