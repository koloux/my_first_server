function Whale(id, name, message) {
	this.id = id;
	this.name = name;
	this.message = message;
}

Whale.prototype.w_info = function() {
	console.log(id);
	console.log(name);
	console.log(message);
};

Whale.prototype.msg_toU = function() {
	var msg = this.message;
	msg = msg.toUpperCase();
}

module.exports = Whale;
