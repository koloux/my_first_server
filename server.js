const http = require('http');
const url = require('url');
const port = 3000;

var Whale = function(id, name, message) {
	this.id = id;
	this.name = name;
	this.message = message;
}
var arrWhale = [];
arrWhale.push(new Whale('1', "Seb", "Welcome I am CEO"));
arrWhale.push(new Whale('2', "Kevin", "I am CTO Bitch!"));
arrWhale.push(new Whale('3', "Nic", "I am an awesome software engineer"));

var server = http.createServer(function(request, response) {
	var url_pname = url.parse(request.url, true).pathname;
	var url_trim = url_pname.split("/");
	var body = [];
	var tmp;
	var i = 0;
	var count = 0;

	response.on('error', function(err) {
		    console.error(err);
		      });
	request.on('error', function(err) {
		console.error(err);
	        response.statusCode = 400;
		response.end();
	});
	if (request.method == "GET" && url_trim[1] == "whales") {
		if (url_trim.length == 2)
			response.end(JSON.stringify(arrWhale, null, arrWhale.length));
		else if (url_trim.length == 3) {
			while (i < arrWhale.length) {
				if (url_trim[2] == arrWhale[i].id)
					response.end(JSON.stringify(arrWhale[i], null, '\t'));
				i++;
			}
		}
		else
			console.log("Invalid GET");
	}
	else if (request.method == "POST") {
		request.on('data', function(data) {
			body.push(data);
			if ((body = Buffer.concat(body).toString()).length > 1e6)
				request.connection.destroy();
		}).on('end', function() {
			tmp = body.split('\"');
			if (tmp[1] == "name" && tmp[5] == "message"){
				if (tmp[3] != "" && tmp[7] != "") {
					arrWhale.push(new Whale(arrWhale.length + 1, tmp[3], tmp[7]));
					console.log(JSON.stringify(arrWhale[arrWhale.length - 1], null, '\t'));
				}
				else
					console.log("Invalid Whale");
			}
			response.end(JSON.stringify(arrWhale[arrWhale.length - 1], null, '\t'));
		});
	}
	else if (request.method == "DELETE") {
		if (url_trim.length == 3) {
			i = 0;
			while (i < arrWhale.length) {
				if (url_trim[2] == arrWhale[i].id) {
					arrWhale.splice(i, 1);
					count++;
				}
				i++;
			}
			response.end("{\n\tcount : " + count + "\n}");
		}
		else
			console.log("Invalid DELETE");
	}
	else {
		url_trim.length == 2 ? true : console.log("Invalid");
		response.end();
	}
});

server.listen(port, (err) => {
	if (err) {
		return console.log("something bad happened", err)
	}
	console.log(`server is listening on ${port}`)
})
