const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  studentId: String,
  course: String,
  email: String,
  phone: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
