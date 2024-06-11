import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../Service/helper';

const Home = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const storedEmployees = getData('employees');
    setEmployees(storedEmployees);

    // Extract departments from employees
    const uniqueDepartments = [...new Set(storedEmployees.map(emp => emp.empDepartment))];
    setDepartments(uniqueDepartments);
  }, []);

  // Handle employee deletion
  const handleDelete = (empId) => {
    const updatedEmployees = employees.filter(emp => emp.empId !== empId);
    setData('employees', updatedEmployees);
    setEmployees(updatedEmployees);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value, selectedDepartment);
  };

  // Handle department select change
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    handleSearch(searchTerm, e.target.value);
  };

  // Handle search
  const handleSearch = (term, department) => {
    const storedEmployees = getData('employees');
    const filteredEmployees = storedEmployees.filter(emp =>
      emp.empName.toLowerCase().includes(term.toLowerCase()) &&
      (department === '' || emp.empDepartment === department)
    );
    setEmployees(filteredEmployees);
  };

  // Handle sort order change
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setEmployees(sortedEmployees);
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md={4}>
          {/* Search input */}
          <Form.Control
            type="text"
            placeholder="Search by Employee Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={4}>
          {/* Department filter */}
          <Form.Select value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">All Departments</option>
            {departments.map(department => (
              <option key={department} value={department}>{department}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th onClick={() => handleSort('empName')}>Employee Name</th>
                <th onClick={() => handleSort('empAge')}>Age</th>
                <th onClick={() => handleSort('empDepartment')}>Department</th>
                <th onClick={() => handleSort('empPosition')}>Position</th>
                <th onClick={() => handleSort('empSalary')}>Salary</th>
                <th onClick={() => handleSort('empEmail')}>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp.empId}>
                  <td>{index + 1}</td>
                  <td>{emp.empName}</td>
                  <td>{emp.empAge}</td>
                  <td>{emp.empDepartment}</td>
                  <td>{emp.empPosition}</td>
                  <td>${emp.empSalary}</td>
                  <td>{emp.empEmail}</td>
                  <td>
                    {/* Action buttons */}
                    <Button variant="danger" onClick={() => handleDelete(emp.empId)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
