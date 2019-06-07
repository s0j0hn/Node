const _ = require('lodash');
const defaultConfig = require('./development');

module.exports = _.merge(defaultConfig, {
  host: '0.0.0.0',
  db: {
    uri: 'mongodb://localhost/WaosNode',
    debug: false,
  },
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem',
    caBundle: './config/sslcerts/cabundle.crt',
  },
  log: {
    format: 'custom',
    pattern: ':id :email :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', // only for custom format
  },
  cors: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
  },
  livereload: false,
});
