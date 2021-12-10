let preprocessor = 'scss';

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat  = require('gulp-concat');
const uglify  = require('gulp-uglify-es').default;
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');



function styles() {
    return src('app/' + preprocessor +'/**/*' + preprocessor)
    .pipe(eval(preprocessor)())
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
        grid:true
    }))
    .pipe(clean(( {level: {1: {specialComments: 0}}})))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())

    
}



function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/'},
        notify: false,
        online: true
    })
};

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/main.js',
        'app/js/guess.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream())

}

function images() {
    return src('app/img/src/**/*')
    .pipe(newer('app/img/dest/'))
    .pipe(imagemin())
    .pipe(dest('app/img/dest/'))
}

function cleanimg() {
    return del('app/img/dest/**/*',{force: true});
}
function cleandist() {
    return del('dist/**/*',{force: true});
}

function buildcopy() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/img/dest/**/*',
        'app/**/*.html',
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function startwatch() {
    watch('app/**/' + preprocessor + '/**/*', styles);
    watch(['app/**/*.js','!app/**/*.min.js'],scripts);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/img/src/**/*', images)
}




exports.cleanimg = cleanimg
exports.styles = styles
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.build = series (cleandist,styles, scripts, images, buildcopy);
exports.images = images;
exports.default = parallel(styles, scripts, browsersync, startwatch)