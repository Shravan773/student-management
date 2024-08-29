const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/student_management', {
  useNewUrlParser: true,
})
.then(() => console.log('MongoDB connected.'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const db = mongoose.connection;

module.exports = db;