http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const server = http.createServer(app);
const portNo = 3001;
const serverAddr = "http://moby.sparcs.org";

server.listen(portNo, () => 
    console.log('Server Listen: ', serverAddr + ":" + portNo)
);

