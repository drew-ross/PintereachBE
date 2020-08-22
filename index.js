const server = require('./api/server.js');
const { port } = require('./config/constants');

server.listen(port, () => console.log(`Running on port ${port}`));