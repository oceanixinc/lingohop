import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import exorcist from 'exorcist';
import browserSync from 'browser-sync';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import ifElse from 'gulp-if-else';
import sass from 'gulp-sass';

watchify.args.debug = true;

const sync = browserSync.create();

// Input file.
watchify.args.debug = true;
var bundler = browserify('src/app.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'src'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
    .on('error', function(error){
      console.error( '\nError: ', error.message, '\n');
      this.emit('end');
    })
    .pipe(exorcist('public/assets/js/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest('public/assets/js'));
}

gulp.task('default', ['transpile']);

gulp.task('transpile', ['lint'], () => bundle());

gulp.task('lint', () => {
    return gulp.src(['src/**/*.js', 'gulpfile.babel.js'])
      .pipe(eslint())
      .pipe(eslint.format())
});

gulp.task('serve', ['transpile'], () => sync.init({
  server: 'public',
  port: process.env.PORT || 3000,
  host: process.env.IP || 'localhost'
}));

gulp.task('js-watch', ['transpile'], () => sync.reload());

gulp.task('images', () =>
    gulp.src('public/assets/images/**/**/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('sass', function () {
  return gulp.src('public/assets/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', ['serve'], () => {
  gulp.watch('src/**/*', ['js-watch'])
  gulp.watch('public/assets/css/style.css', sync.reload)
  gulp.watch('public/index.html', sync.reload)
    gulp.watch(['public/assets/css/style.scss','public/assets/css/partials/*.scss'], ['sass']);
});
