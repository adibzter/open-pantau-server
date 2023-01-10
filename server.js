const { createApiServer } = require('./servers/api-server');
const { createStreamServer } = require('./servers/stream-server');

createApiServer();
createStreamServer();
