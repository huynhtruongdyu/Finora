const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Paths
const paths = {
  scss: {
    src: 'Assets/Scss/**/*.scss',
    dest: 'wwwroot/css'
  },
  scripts: {
    src: 'Assets/Scripts/**/*.js',
    dest: 'wwwroot/js'
  },
  indexHtml: 'wwwroot/index.html'
};

// Compute MD5 hash of file content (first 8 characters)
function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) return '';
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex').substring(0, 8);
}

// Compile and minify SCSS
function styles() {
  return gulp.src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.scss.dest));
}

// Minify JavaScript
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(terser())
    .pipe(gulp.dest(paths.scripts.dest));
}

// Cache busting by modifying wwwroot/index.html
function cacheBust(cb) {
  if (fs.existsSync(paths.indexHtml)) {
    const cssHash = getFileHash(path.join(paths.scss.dest, 'app.css')) || '1';
    const jsHash = getFileHash(path.join(paths.scripts.dest, 'main.js')) || '1';

    let html = fs.readFileSync(paths.indexHtml, 'utf8');

    // Replace href="css/app.css?v=..." or href="css/app.css"
    html = html.replace(/(href="css\/app\.css)(?:\?v=[a-zA-Z0-9]+)?(")/g, `$1?v=${cssHash}$2`);
    // Replace src="js/main.js?v=..." or src="js/main.js"
    html = html.replace(/(src="js\/main\.js)(?:\?v=[a-zA-Z0-9]+)?(")/g, `$1?v=${jsHash}$2`);

    fs.writeFileSync(paths.indexHtml, html, 'utf8');
  }
  cb();
}

// Build task (series of compile -> cacheBust)
const build = gulp.series(gulp.parallel(styles, scripts), cacheBust);

exports.styles = styles;
exports.scripts = scripts;
exports.cacheBust = cacheBust;
exports.build = build;
exports.default = build;
