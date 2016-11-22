function isValid(num) {
	return !isNaN(num) && isFinite(num);
}

module.exports = {
	isValid: isValid
};
