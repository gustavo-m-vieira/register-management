import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import "./NewProduct.css";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import { handleReset } from "../../libs/handleResetLib";

export default function NewProduct() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    price: "",
    name: "",
    description: "",
    amount: "", 
  });

  function validateForm() {
    return fields.price.length > 0 && fields.name.length > 0 && fields.description.length > 0 && fields.amount.length > 0;
  }

  function createdNewProduct(products) {
    localStorage.setItem('products', JSON.stringify(products));

    alert('Created Product!');
    history.push("/products");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      let products = localStorage.getItem('products');
      if (products) {
        products = JSON.parse(products);
        const existsCurrentProduct = products.find(({ name }) => name === fields.name);

        if (existsCurrentProduct) {
          onError('Exists Current Product');
          setIsLoading(false);
          handleReset();
        } else {
          // I know this is super insecure, but not using externals services its the best I can think
          products.push({ price: fields.price, name:fields.name, description: fields.description, amount: fields.amount });
          createdNewProduct(products);
        }
      } else {
        // I know this is super insecure, but not using externals services its the best I can think
        products = [{ price: fields.price, name:fields.name, description: fields.description, amount: fields.amount }];
        createdNewProduct(products);
      }
    }, 3000);
  }

  return (
    <div className="NewProduct">
      <Form onSubmit={handleSubmit}>
        <legend className="legend font-weight-bold text-muted active navbar-brand">New Product</legend>
        <Form.Group controlId="name" size="lg">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="description" size="lg">
          <Form.Label>Description</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.description}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="amount" size="lg">
          <Form.Label>Amount Available</Form.Label>
          <Form.Control
            autoFocus
            type="number"
            value={fields.amount}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="price" size="lg">
          <Form.Label>Price</Form.Label>
          <Form.Control
            autoFocus
            type="number"
            value={fields.price}
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
          Create Product
        </LoaderButton>
      </Form>
    </div>
  );
}