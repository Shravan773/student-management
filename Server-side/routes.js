const express = require('express');
const router = express.Router();
const operations = require('./operations');

router.get('/students', operations.getAllStudents);
router.post('/students', operations.createStudent);
router.put('/students/:id', operations.updateStudent);
router.delete('/students/:id', operations.deleteStudent);

module.exports = router;
