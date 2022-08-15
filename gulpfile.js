const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');

function copyAssets() {
  return gulp.src(['src/asset/fonts/**']).pipe(gulp.dest('dist/asset/fonts')),
    gulp.src(['src/asset/images/**']).pipe(gulp.dest('dist/asset/images'))
}

function copyCss() {
    return gulp.src(['src/css/**']).pipe(gulp.dest('dist/css')),
      gulp.src(['src/asset/images/**']).pipe(gulp.dest('dist/asset/images'))
  }

function compileHtml() {
  return gulp.src(['src/html/**/*.html'])
    .pipe(gulp.dest('dist/html'));
}

function compileJs() {
  return gulp.src([
    'src/js/*'
  ])
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}

function compileScss() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass()) /* compile scss */
    .pipe(gulp.dest('src/css'));
}

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "src",
      index: "html/index.html",
    }

  });
  gulp.watch('src/scss/**/*.scss', gulp.series([compileScss, reload]));
  gulp.watch('src/js/**/*.js', gulp.series([compileJs, reload]));
  gulp.watch('src/asset/**/*', gulp.series([compileJs, reload]));
  gulp.watch('src/html/**/*.html', gulp.series([copyAssets, copyCss, compileHtml, reload]));
}

const recompile = gulp.parallel(compileHtml, copyAssets, compileJs, compileScss);
const build = gulp.series(recompile, watch);

exports.copyAssets = copyAssets;
exports.compileJs = compileJs;
exports.compileScss = compileScss;
exports.watch = watch;

gulp.task('default', build);