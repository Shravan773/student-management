import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Form } from 'react-bootstrap';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/students`)
      .then(response => setStudents(response.data))
      .catch(err => setMessage('Error fetching students.'));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`)
      .then(response => {
        setStudents(students.filter(student => student._id !== id));
        setMessage('Student deleted successfully!');
      })
      .catch(err => setMessage('Error deleting student.'));
  };

  const filteredStudents = students.filter(student =>
    (student.firstName || '').toLowerCase().includes(search.toLowerCase()) ||
    (student.lastName || '').toLowerCase().includes(search.toLowerCase()) ||
    (student.studentId || '').toLowerCase().includes(search.toLowerCase()) ||
    (student.course || '').toLowerCase().includes(search.toLowerCase()) ||
    (student.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (student.phone || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {message && <Alert variant="info">{message}</Alert>}
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Student ID</th>
            <th>Course</th>
            <th>Email ID</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student._id}>
              <td>{student.firstName || ''}</td>
              <td>{student.lastName || ''}</td>
              <td>{student.studentId || ''}</td>
              <td>{student.course || ''}</td>
              <td>{student.email || ''}</td>
              <td>{student.phone || ''}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(student._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;
