'use strict';

var concat = require('gulp-concat');
var gulp = require('gulp');
var handleError = require('../handleError');
var normalizeOptions = require('../options');
var sass = require('gulp-sass');

module.exports = function(options) {
	options = normalizeOptions(options);
	var taskPrefix = options.taskPrefix;

	gulp.task(taskPrefix + 'css', function() {
		var sassOpts = {
			includePaths: options.scssIncludePaths
		};
		return gulp.src(concatSrcs(options.scssSrc, options.cssSrc))
			.pipe(sass(sassOpts).on('error', function(error) {
				handleError.call(this, error, 'sass');
			}))
			.pipe(concat(options.bundleCssFileName))
			.pipe(gulp.dest(options.cssDest));
	});
};

function concatSrcs(src1, src2) {
	src1 = Array.isArray(src1) ? src1 :[src1];
	src2 = Array.isArray(src2) ? src2 :[src2];
	return src1.concat(src2);
}
