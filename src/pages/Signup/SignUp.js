import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./Signup.css";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function createdNewUser(users) {
    localStorage.setItem('users', JSON.stringify(users));

    userHasAuthenticated(true);
    localStorage.setItem('userIsAuthenticated', 'authenticated');
    history.push("/");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      let users = localStorage.getItem('users');
      if (users) {
        users = JSON.parse(users);
        const existsCurrentUser = users.find(({ email }) => email === fields.email);

        if (existsCurrentUser) {
          onError('Exists Current User');
          setIsLoading(false);
          // limpar fields aqui
        } else {
          // I know this is super insecure, but not using externals services its the best I can think
          users.push({ email: fields.email, password: fields.password });
          createdNewUser(users);
        }
      } else {
        // I know this is super insecure, but not using externals services its the best I can think
        users = [{ email: fields.email, password: fields.password }];
        createdNewUser(users);
      }
    }, 3000);

    setIsLoading(false);
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}