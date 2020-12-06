import React, { useState } from "react";
import { Card } from "react-bootstrap";
// import { withRouter } from "react-router-dom";
import validator from "validator";
import axios from "axios";

const LoginPage = (props) => {
  const { handleUserData } = props;
  const [showMessage, setShowMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const errors = {};
  const handleFocus = () => {
    setShowMessage(true);
  };
  const handleBlur = () => {
    setShowMessage(false);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const runValidation = () => {
    //email validation
    if (email.trim().length === 0) {
      errors.email = "email cannot be blank";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email formate";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    runValidation();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          const result = response.data;
          const status = result.find((user) => {
            return user.email === email;
          });
          if (status) {
            handleUserData(status);
            //TO update parent component
            props.history.push("/dashboard");
          } else if (status === undefined) {
            errors.email = "email does not exist";
            setFormErrors(errors);
          }
        });
    } else {
      setFormErrors(errors);
    }
    setEmail("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card
          style={{
            width: "350px",
            height: "200px",
            border: "5px solid grey",
            borderRadius: "20px",
            marginLeft: "40%",
            marginTop: "5%",
          }}
        >
          <Card.Header
            style={{
              paddingTop: "15px",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            LOGIN
          </Card.Header>
          <Card.Body style={{ paddingTop: "30px", textAlign: "center" }}>
            <input
              type="text"
              size="25"
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={email}
              onChange={handleEmailChange}
            />
            <br />
            {formErrors.email && <span>{formErrors.email}</span>}
            <br />

            {showMessage && (
              <span style={{ color: "red" }}>Enter in login</span>
            )}
          </Card.Body>
        </Card>
      </form>
    </div>
  );
};
// export default withRouter(LoginPage);
export default LoginPage;
