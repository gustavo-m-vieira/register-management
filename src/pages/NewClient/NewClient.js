import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import "./NewClient.css";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";

export default function NewClient() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    name: "",
    address: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.name.length > 0 && fields.address.length > 0;
  }

  function handleReset() {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  };

  function createdNewClient(clients) {
    localStorage.setItem('clients', JSON.stringify(clients));

    alert('Created Client!');
    history.push("/clients");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true); console.log(isLoading);

    setTimeout(() => {
      let clients = localStorage.getItem('clients');
      if (clients) {
        clients = JSON.parse(clients);
        const existsCurrentClient = clients.find(({ email }) => email === fields.email);

        if (existsCurrentClient) {
          onError('Exists Current Client');
          setIsLoading(false);
          handleReset();
        } else {
          // I know this is super insecure, but not using externals services its the best I can think
          clients.push({ email: fields.email, name:fields.name, address: fields.address });
          createdNewClient(clients);
        }
      } else {
        // I know this is super insecure, but not using externals services its the best I can think
        clients = [{ email: fields.email, name:fields.name, address: fields.address }];
        createdNewClient(clients);
      }
    }, 3000);
  }

  return (
    <div className="NewClient">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" size="lg">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="address" size="lg">
          <Form.Label>Address</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.address}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="dark"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create Client
        </LoaderButton>
      </Form>
    </div>
  );
}