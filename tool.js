/**
 * 从字符串中提取数字
 * @param {Object} str
 */
var extractNum = function(str) {
	return parseInt(str.replace(/[^-0-9]/ig, ""));
}
/**
 * 
 * @param {Object} num
 */
var intCeil = function(n) {
	return n + (10 - n % 10);
}
/**
 * 
 * @param {Object} num
 */
var intFloor = function(n) {
	return n - n % 10;
}