import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

import "./Login.css";
import { useAppContext } from "../../libs/contextLib";
import LoaderButton from "../../components/LoaderButton";
import { onError } from "../../libs/errorLib";

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      let users = localStorage.getItem('users'); console.log({ users });
      if (users) {
        users = JSON.parse(users); console.log({ users });
        const existsCurrentUser = users.find((user) => {
          const {
            email: storedEmail,
            password: storedPassword,
          } = user || {};

          if (storedEmail === email && storedPassword === password) return true;
          return false;
        });

        if (existsCurrentUser) {
          userHasAuthenticated(true);
          localStorage.setItem('userIsAuthenticated', 'authenticated');
          history.push("/");
        } else {
          onError('Unexistent User');
          history.push("/signup");
        }
      } else {
        onError('Unexistent User');
        history.push("/signup");
      }
    }, 3000);
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}