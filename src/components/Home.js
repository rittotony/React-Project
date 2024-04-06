import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import './Home.css';

export const Home = () => {
 
    const [formData, setFormData] = useState({
        fullName: "",
        userEmail: "",
        userPassword: "",
        userPhone: ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Access form data here (formData)
        console.log(formData);
        // You can perform further actions like sending data to server, etc.
      };


  return (
    <div className="center">
      <Card className="formCard">
        <Card.Body>
          <Card.Title className="cardTitle">Data collection</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userFullName">
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" name="fullName" value={FormData.fullName} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="userEmail" value={FormData.userEmail} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="userPassword" value={FormData.userPassword} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" placeholder="Phone" name="userPhone" value={FormData.userPhone} onChange={handleChange} />
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

export default Home;