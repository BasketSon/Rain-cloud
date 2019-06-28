'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require("gulp-sourcemaps");
var server = require('browser-sync').create();
var rename = require('gulp-rename');
var posthtml = require('gulp-posthtml');
var del = require("del");
var htmlmin = require('gulp-htmlmin');
var jsmin = require('gulp-uglify');
var minify = require("gulp-csso");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

gulp.task('clear', async function () {
  await del("dist/**");
});

gulp.task("copyhtml", function () {
  return gulp.src(["app/*.html"],
  {
    base: "app"
  })
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("dist"));
});

gulp.task("css", function () {
  return gulp.src(["app/css/**"],
  {
    base: "app"
  })
  .pipe(plumber())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(minify())
  .pipe(gulp.dest("dist"));
});

gulp.task("copyrest", function () {
  return gulp.src(["app/*.ico", "app/css/**", "app/img/**", "app/js/**"],
  {
    base: "app"
  })
  .pipe(gulp.dest("dist"));
});

gulp.task("js", function () {
  return gulp.src(["app/js/**/*.js"],
   {
    base: "app"
  })
  .pipe(jsmin())
  .pipe(gulp.dest("dist"));
});


gulp.task("server", function () {
  server.init({
    server: "dist/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("app/*.html", gulp.series("copyhtml")).on("change", server.reload);
  gulp.watch("app/js/**/*.js", gulp.series("js")).on("change", server.reload);
  gulp.watch("app/css/**/*.css", gulp.series("css")).on("change", server.reload);
});


gulp.task("start", gulp.series("clear", "copyhtml", "copyrest", "server"));
// gulp.task("build", gulp.series("del", "html", "css", "js", "server"));
