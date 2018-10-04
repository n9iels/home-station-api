var gulp = require("gulp"),
    normalize = require('node-normalize-scss').includePaths;

// Plugins for CSS compoling
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');

gulp.task("default", ['stylesheets']);

// Compile Stylesheets
gulp.task('stylesheets', function () {
    return gulp.src('./style/style.scss')
        .pipe(sass({ includePaths: [normalize] }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['> 2%', 'last 2 versions'], cascade: false }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./wwwroot/css'));
});

gulp.task('watch', function (callback) {
    gulp.watch('./style/**/*.scss', ['stylesheets']);
});