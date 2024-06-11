import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getData, setData } from '../Service/helper';

const Create = () => {
  const [formData, setFormData] = useState({
    empName: '',
    empAge: '',
    empDepartment: '',
    empPosition: '',
    empSalary: '',
    empEmail: ''
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { empId: uuidv4(), ...formData };

    // Save the new employee data
    setData('employees', [...getData('employees'), newEmployee]);

    // Redirect to the home page
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="empName"
                value={formData.empName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="empAge"
                value={formData.empAge}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="empDepartment"
                value={formData.empDepartment}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="empPosition"
                value={formData.empPosition}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="empSalary"
                value={formData.empSalary}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="empEmail"
                value={formData.empEmail}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Create Employee</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
