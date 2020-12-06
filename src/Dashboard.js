import React, { useState, useEffect } from "react";
import { Button, Card, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const styling = {
  position: "absolute",
  right: "0",
  top: "0",
};
const Dashboard = (props) => {
  const { userData } = props;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userData.id}`)
      .then((response) => {
        const result = response.data;

        if (result.length > 0) {
          setPosts(result);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [userData]);
  const handleClick = () => {
    localStorage.removeItem("data");
  };
  return (
    <div>
      <Card style={{ width: "60rem", marginLeft: "200px" }}>
        <Navbar variant="dark" bg="light" style={{ height: "40px" }}>
          <Link to="/">
            <Button variant="secondary" style={styling} onClick={handleClick}>
              Logout
            </Button>
          </Link>
        </Navbar>
      </Card>
      <br />
      <Card style={{ width: "60rem", marginLeft: "200px" }}>
        <Card.Title>
          <h3>
            Name-<b>{userData.name}</b>{" "}
          </h3>
          <h4>
            email-<b>{userData.email}</b>{" "}
          </h4>
          <h4>
            phone-<b>{userData.phone}</b>{" "}
          </h4>
        </Card.Title>
        <Card.Title>
          <h3 style={styling}>Company Name</h3>
          <h3 style={{ position: "absolute", right: "0", top: "30px" }}>
            <b>{userData.company && userData.company.name}</b>
          </h3>
          <h4 style={{ position: "absolute", right: "0", top: "70px" }}>
            <b>{userData.company && userData.company.catchPhrase}</b>
          </h4>
        </Card.Title>
      </Card>
      <br />
      <Card style={{ width: "60rem", marginLeft: "200px" }}>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <Card style={{ width: "55rem", marginLeft: "50px" }}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Body>{post.body}</Card.Body>
              </Card>
              <br />
            </div>
          );
        })}
      </Card>
    </div>
  );
};
export default Dashboard;
