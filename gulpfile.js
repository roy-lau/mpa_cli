var gulp = require('gulp')

	gulp.task('html', function() {
	    gulp.src('src/page/**/*.html')
	        // 做一些处理
	        .pipe(gulp.dest('dist/page'))
	})
	gulp.task('css', function() {
	    gulp.src('src/css/**/*.css')
	        // 做一些处理
	        .pipe(gulp.dest('dist/css'))
	})
	gulp.task('fonts', function() {
	    gulp.src('src/fonts/**/*.font')
	        // 做一些处理
	        .pipe(gulp.dest('dist/fonts'))
	})
	gulp.task('imgs', function() {
	    gulp.src('src/imgs/**/*.jpg')
	        // 做一些处理
	        .pipe(gulp.dest('dist/imgs'))
	})
	gulp.task('js', function() {
	    gulp.src('src/js/**/*.js')
	        // 做一些处理
	        .pipe(gulp.dest('dist/js'))
	})
	// 用来删除dist文件夹
	gulp.task('clean', function() {
	    var child_process = require('child_process')
	    var workerProcess = child_process.exec('rm -rf dist/',function(error, stdout, stderr) {
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
	// 用法： gulp --watch 任何task执行完成都会执行watck
	gulp.watch('src/js/**/*.js', function(event) {
	    console.log('文件路径：' + event.path + ' 事件类型：' + event.type + ', running tasks...');
	})

	// 用法： gulp build
	gulp.task('build', ['html', 'css', 'fonts', 'imgs', 'js'], function() {
	    // 做一些处理
	})