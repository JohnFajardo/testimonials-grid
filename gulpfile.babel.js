import gulp from 'gulp';
import sass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import browserSync, { reload } from 'browser-sync'

const sassOptions = {outputStyle: 'expanded', errLogToConsole: true};

exports.sass = () => (
    gulp.src('./src/scss/styles.scss')
    .pipe(sass(sassOptions))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream: true}))
);

exports.images = () => (
    gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
    .pipe(browserSync.reload({stream: true}))
)

exports.copy = () => (
    gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream: true}))
)

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html'
        },
        notify: false,
        injectChanges: true
    });

    gulp.watch('./src/scss/**/*', gulp.series('sass'));
    gulp.watch('./src/images/**/*', gulp.series('images'));
    gulp.watch('./src/*.html', gulp.series('copy'));
    gulp.watch('./dist').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));