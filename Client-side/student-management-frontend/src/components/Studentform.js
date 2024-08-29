import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const StudentForm = () => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    course: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (editingId) {
      axios.get(`${process.env.REACT_APP_API_URL}/students/${editingId}`)
        .then(response => setStudent(response.data))
        .catch(err => setMessage('Error fetching student data.'));
    }
  }, [editingId]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${process.env.REACT_APP_API_URL}/students/${editingId}`, student)
        .then(response => {
          setMessage('Student updated successfully!');
          setStudent({
            firstName: '',
            lastName: '',
            studentId: '',
            course: '',
            email: '',
            phone: ''
          });
          setEditingId(null);
        })
        .catch(err => setMessage('Error updating student.'));
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/students`, student)
        .then(response => {
          setMessage('Student added successfully!');
          setStudent({
            firstName: '',
            lastName: '',
            studentId: '',
            course: '',
            email: '',
            phone: ''
          });
        })
        .catch(err => setMessage('Error adding student.'));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="my-4">
      {message && <Alert variant="info">{message}</Alert>}
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="firstName" value={student.firstName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="lastName" value={student.lastName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="studentId">
        <Form.Label>Student ID</Form.Label>
        <Form.Control type="text" name="studentId" value={student.studentId} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="course">
        <Form.Label>Course</Form.Label>
        <Form.Control type="text" name="course" value={student.course} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email ID</Form.Label>
        <Form.Control type="email" name="email" value={student.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" name="phone" value={student.phone} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        {editingId ? 'Update Student' : 'Add Student'}
      </Button>
    </Form>
  );
};

export default StudentForm;
