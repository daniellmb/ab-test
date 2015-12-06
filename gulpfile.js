var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    complexity = require('gulp-complexity'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngmin = require('gulp-ngmin');

gulp.task('default', function () {
  return gulp.src('ab-test.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(complexity({
      cyclomatic: [8],
      halstead: [10],
      maintainability: [100]
    }))
    .pipe(rename('ab-test.min.js'))
    .pipe(ngmin())
    .pipe(uglify({
      preserveComments: 'some',
      outSourceMap: true
    }))
    .pipe(gulp.dest('.'));
});