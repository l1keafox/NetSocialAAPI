const { connect, connection } = require('mongoose');

connect('mongodb://localhost/netSocial', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
