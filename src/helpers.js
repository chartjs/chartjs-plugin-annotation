function isValid(num) {
	return !isNaN(num) && isFinite(num);
}

function decorate(obj, prop, func) {
	var prefix = '$';
	if (!obj[prefix + prop]) {
		obj[prefix + prop] = obj[prop].bind(obj);
		obj[prop] = function() {
			return func(obj[prefix + prop]);
		};
	}
}

module.exports = {
	isValid: isValid,
	decorate: decorate
};
