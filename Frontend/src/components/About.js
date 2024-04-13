import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"; 
import "./Home.css";

export const About = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8081/tbl_about")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/tbl_about/${id}/delete`)
      .then((response) => {
        console.log("Delete request sent successfully", response);
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div className="center">
      <Card className="formCard">
        <Card.Body>
          <Card.Title className="cardTitle">This is About me</Card.Title>
          <div className="m-2">
            <Link className="btn btn-success btn-sm" to="/">
              Add +
            </Link>
          </div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Full name</th>
                <th>Email</th>
                <th>password</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{d.fullname}</td>
                  <td>{d.email}</td>
                  <td>{d.password}</td>
                  <td>{d.phone}</td>
                  <td>
                    <Link
                      to={`/update/${d.ids}`}
                      className="btn btn-warning btn-sm m-1"
                    >
                      Update
                    </Link>

                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "Do you want to really delete this data?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete(d.ids);
                          }
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
