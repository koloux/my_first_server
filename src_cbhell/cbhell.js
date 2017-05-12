const net = require('net');
const http = require('http');
const port = 3000;

var Whale = require('../src_server/whale.js');
var arrWhales = [];

var options = {
	host: 'localhost',
	port: port,
	path: '/whales'
};

var socket = new net.Socket();
socket.connect(port, "localhost", function () {
	console.log("Client: Connected to server");
});

callback = function(response) {
	var str = '';
	response.on('data', function(chunk) {
		str += chunk;
	});
	response.on('end', function() {
		var tmp = str.split('\"');
		for (var i = 0; i < tmp.length; i++) {
			if (tmp[i] == "id" && tmp[i + 4] == "name" && tmp[i + 8] == "message")
				arrWhales.push(new Whale(tmp[i + 2], tmp[i + 6], tmp[i + 10]));
		}
		arrWhales.sort(function(wa, wb) {
			wa.message = wa.message.toUpperCase();
			wb.message = wb.message.toUpperCase();
			if (wa.name < wb.name)
				return (-1);
			if (wa.name > wb.name)
				return (1);
			return (0);
		});
		console.log(arrWhales);
	});
}

http.request(options, callback).end();
