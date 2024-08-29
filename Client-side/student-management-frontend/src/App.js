import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import StudentForm from './components/Studentform';
import StudentList from './components/Studentlist';

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Student Management Portal</Navbar.Brand>
      </Navbar>
      <Container>
        <h1 className="mt-4">Student Management</h1>
        <StudentForm />
        <StudentList />
      </Container>
    </div>
  );
}

export default App;
