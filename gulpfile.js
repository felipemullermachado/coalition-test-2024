const path = require('path')
const gulp = require('gulp')
const stylusProportional = require('stylus-proportional').gulp
const stylus = require('gulp-stylus')
const concat = require('gulp-concat')
const cssnano = require('gulp-cssnano')
const notify = require('gulp-notify')
const livereload = require('gulp-livereload')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const tsify = require('tsify')
const uglify = require('gulp-uglify-es').default

// Process stylus files into stylesheet
gulp.task('minify', async function () {
  let pipeline = gulp

  function minify(source, target) {
    pipeline = gulp
      .src(source)
      .pipe(stylusProportional())
      .pipe(stylus())
      .pipe(concat(target))
      .pipe(cssnano())
      .pipe(gulp.dest(__dirname))
      .pipe(livereload());
  }

  minify(
    [
      path.join(__dirname, 'node_modules/reset-css/reset.css'),
      path.join(__dirname, 'assets/styl/index.styl'),
    ],
    'style.css'
  )
  pipeline = pipeline.pipe(notify({ message: 'CSS Ready!', onLast: true }))
})

// Compile and uglify typescript files
gulp.task('uglify', async function () {
  browserify()
    .add(path.join(__dirname, 'assets/ts/index.ts'))
    .plugin(tsify)
    .bundle()
    .on(
      'error',
      notify.onError({
        message: 'Error: <%= error.message %>',
        onLast: true,
      })
    )
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(__dirname))
    .pipe(notify({ message: 'JS Ready!', onLast: true }))
})

// Watch file changes
gulp.task('watch', async function () {
  livereload.listen()
  gulp.watch(path.join(__dirname, 'assets/styl/**/*.styl'), gulp.series('minify'))
  gulp.watch(path.join(__dirname, 'assets/ts/**/*.ts'), gulp.series('uglify'))
})

gulp.task('default', gulp.series('minify', 'uglify', 'watch'))

gulp.task('build', gulp.series('minify', 'uglify'))