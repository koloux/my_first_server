function Whale(id, name, message) {
	this.id = id;
	this.name = name;
	this.message = message;
}

Whale.prototype.w_info = function () {
};

module.exports = Whale;
