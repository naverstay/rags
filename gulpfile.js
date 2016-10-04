var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
})

gulp.task('jade', function () {
    gulp.src(['app/jade/*.jade', '!app/jade/_*.jade'])
        //.pipe(plumber())
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
})

gulp.task('sass', function () {
    return gulp.src('app/scss/main_global.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass()) // Passes it through a gulp-sass
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
})

// Watchers
gulp.task('watch', function () {
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch(['app/**/*.jade', 'app/**/*.pug'], ['jade']);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('dist/images'))
});

// Copying fonts 
gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

// Cleaning 
gulp.task('clean', function () {
    return del.sync('dist').then(function (cb) {
        return cache.clearAll(cb);
    });
})

gulp.task('clean:dist', function () {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function (callback) {
    runSequence(['sass', 'jade', 'browserSync', 'watch'],
        callback
    )
})

gulp.task('build', function (callback) {
    runSequence(
        'clean:dist',
        'sass',
        'jade',
        ['useref', 'images', 'fonts'],
        callback
    )
})
