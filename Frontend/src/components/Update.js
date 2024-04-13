import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios"; 
import { useNavigate, useParams } from 'react-router-dom';
import "./Home.css";

export const Update = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const { id } = useParams(); 
 
  useEffect(() => {
    axios.get(`http://localhost:8081/tbl_about/${id}`)
      .then(response => {
        if (response.data && Object.keys(response.data).length > 0) {
          const fetchedData = response.data[0]; 
          setFormData({
            fullname: fetchedData.fullname,
            email: fetchedData.email,
            password: fetchedData.password,
            phone: fetchedData.phone
          });
        }
      })
      .catch(err => console.log(err)); 
  }, [id]);
  
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/tbl_about/${id}/update`, formData)
    .then(response => {
      navigate('/about');
      console.log(response);
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="center">
      <Card className="formCard">
        <Card.Body>
          <Card.Title className="cardTitle">Update Details</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userFullName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="fullname"
                value={formData.fullname} // Update input value with state
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email} // Update input value with state
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password} // Update input value with state
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone"
                name="phone"
                value={formData.phone} // Update input value with state
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Update;
