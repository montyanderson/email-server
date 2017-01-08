const net = require("net");

net.createServer(client => {
	let buffer = "";
	let dataRecv = false;

	client.write(`220 montyanderson.net ESMTP Postfix\n`);

	client.on("data", data => {
		buffer += data;

		console.log(buffer);

		if(buffer.slice(-1) == "\n") {
			if(dataRecv == false) {
				const args = buffer.split(" ");
				const cmd = args.unshift();

				switch(cmd) {
					default:
						client.write(`250 Ok\n`);
						break;
					case "DATA":
						client.write(`354 End data with <CR><LF>.<CR><LF>\n`);
						break;
					case "QUIT":
						client.end();
						break;
				}

				buffer = "";
			}
		}
	});
}).listen(25);
