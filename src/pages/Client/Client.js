/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { onError } from "../../libs/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton";
import { useFormFields } from "../../libs/hooksLib";

export default function Client() {
  const { email } = useParams();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [fields, handleFieldChange, setClient] = useFormFields({
    email: "",
    name: "",
    address: "",
  });

  useEffect(() => {
    async function onLoad() {
      setTimeout(() => {
        let clients = localStorage.getItem('clients');
        if (clients) clients = JSON.parse(clients);
        const client = clients.find((client) => client.email === email);

        if (!client) {
          onError('Failed to load client. Try again later.');
          history.push("/clients");
        }
        
        setClient(client);
        setIsLoading(false);
      }, 3000);
    }
    onLoad();
  }, []);

  function validateForm() {
    return fields.email.length > 0 && fields.name.length > 0 && fields.address.length > 0;
  }

  async function handleSubmit(event) { //AKA handleUpdate
    event.preventDefault();

    setIsUpdating(true);
    setTimeout(() => {
      let clients = localStorage.getItem('clients');
      if (clients) clients = JSON.parse(clients);

      let foundClient = false;
      const updatedClients = clients.map((client) => {
        if (client.email === email) {
          foundClient = true;
          client.name = fields.name;
          client.email = fields.email;
          client.address = fields.address;
        }

        return client;
      });

      if (!foundClient) {
        onError('Failed to update client. Try again later.');
        history.push("/clients");
      }

      localStorage.setItem('clients', JSON.stringify(updatedClients));
      
      setIsUpdating(false);
      alert('Client Updated!');
    }, 3000);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );
  
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setTimeout(() => {
      let clients = localStorage.getItem('clients');
      if (clients) clients = JSON.parse(clients);

      const amountOfClients = clients.length;

      const updatedClients = clients.filter((client) => {
        if (client.email === email) return false;
        return true;
      });

      if (amountOfClients === updatedClients.length) {
        onError('Failed to delete client. Try again later.');
        history.push("/clients");
      }

      localStorage.setItem('clients', JSON.stringify(updatedClients));
      
      setIsDeleting(false);
      alert('Client Deleted!');
      history.push("/clients");
    }, 3000);
  }

  function renderClient() {
    return (
      <Form onSubmit={handleSubmit}>
        <legend className="legend font-weight-bold text-muted active navbar-brand">Edit Client</legend>
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
          isLoading={isUpdating}
          disabled={!validateForm() || isDeleting}
        >
          Save
        </LoaderButton>
        <LoaderButton
          block
          size="lg"
          variant="danger"
          onClick={handleDelete}
          isLoading={isDeleting}
          disabled={!validateForm() || isUpdating}
        >
          Delete
        </LoaderButton>
      </Form>
    )
  }

  return (
    <div className="Client">
      {!isLoading && renderClient()}
    </div>
  );
}
