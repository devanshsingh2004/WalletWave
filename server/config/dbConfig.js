const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url)

const connectionResult = mongoose.connection;

connectionResult.on('error', () => {
  console.log('Error connectiong to database');
});
connectionResult.on('connected' , () => {
  console.log('Connected to database');
});

