var gulp = require('gulp'),
    minifyHtml = require("gulp-minify-html"), // 压缩HTML

    minifyCss = require('gulp-minify-css'), // 压缩CSS
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),

    less = require("gulp-less"), // 将less转化为css
    imagemin = require('gulp-imagemin'), // 图片压缩
    uglify = require('gulp-uglify'), // 压缩js
    connect = require('gulp-connect') // 启动服务器，热更新

gulp.task('html', function() {
    gulp.src('src/page/**/*.html')
        .pipe(minifyHtml()) // 压缩HTML
        .pipe(connect.reload()) // 热更新
        .pipe(gulp.dest('dist/page'))
})
gulp.task('css', function() {
    var processors = [autoprefixer({ browsers: ['last 8 version'] }), cssnext];

    gulp.src('src/css/**/*.css')
        .pipe(postcss(processors)) // 加浏览器前缀
        .pipe(minifyCss()) // 压缩CSS
        .pipe(connect.reload()) // 热更新
        .pipe(gulp.dest('dist/css'))
})
gulp.task('less', function() {
    var processors = [autoprefixer({ browsers: ['last 8 version'] }), cssnext];
    gulp.src('src/less/**/*.less')
        .pipe(postcss(processors)) // 加浏览器前缀
        .pipe(less()) // 将less转化为css
        .pipe(minifyCss()) // 压缩CSS
        .pipe(connect.reload()) // 热更新
        .pipe(gulp.dest('dist/css'))
})
gulp.task('fonts', function() {
    gulp.src('src/fonts/**/*.font')
        // 做一些处理
        .pipe(gulp.dest('dist/fonts'))
})
gulp.task('imgs', function() {
    gulp.src('src/imgs/**/*')
        .pipe(imagemin({ optimizationLevel: 5 })) // 图片压缩（optimizationLevel优化级别）
        .pipe(connect.reload()) // 热更新
        .pipe(gulp.dest('dist/imgs'))
})
gulp.task('js', function() {
    gulp.src('src/js/**/*.js')
        .pipe(uglify()) //压缩js
        .pipe(connect.reload()) // 热更新
        .pipe(gulp.dest('dist/js'))
})
// 用来删除dist文件夹
gulp.task('clean', function() {
    var child_process = require('child_process')
    var workerProcess = child_process.exec('rm -rf dist/', function(error, stdout, stderr) {
        if (error) {
            console.error(error.stack);
            console.error('Error code:' + error.code);
            console.error('Signal received:' + error.signal);
        }
        console.log('文件删除完毕！');
    });

    workerProcess.on('exit', function(code) {
        console.log('子进程已退出，退出码：' + code);
    })
})

// 用法： gulp
gulp.task('default', function() {
    // 做一些处理
})
// 用法： gulp watch
gulp.task('watch', function() {
    gulp.watch(['src/page/**/*.html'], ['html']);
    gulp.watch(['src/css/**/*.css'], ['css']);
    gulp.watch(['src/less/**/*.less'], ['less']);
    gulp.watch(['src/fonts/**/*.font'], ['fonts']);
    gulp.watch(['src/imgs/**/*'], ['imgs']);
    gulp.watch(['src//js/**/*.js'], ['js']);
})

gulp.task('connect', function() {
    connect.server({
        name: 'Dist App',
        root: 'src',
        port: 8001,
        livereload: true,
        debug: true,
        middleware: function(connect, opt) {
            return []
        }
    });
});
gulp.task('dev', ['connect', 'watch']) // 启动一个服务器，监听文件的变化(热加载)


// 用法： gulp build
gulp.task('build', ['clean', 'js', 'css', 'fonts', 'imgs', 'html'], function() {
    // 做一些处理
})