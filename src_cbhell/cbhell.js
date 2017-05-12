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

function sort_name(arrWhales) {
	

}

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
		for (i = 0; i < arrWhales.length; i++) {
			console.log(arrWhales[i]);
		}
	});
}

http.request(options, callback).end();
