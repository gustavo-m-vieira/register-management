/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { onError } from "../../libs/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton";
import { useFormFields } from "../../libs/hooksLib";

export default function Product() {
  const { name } = useParams();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [fields, handleFieldChange, setProduct] = useFormFields({
    description: "",
    name: "",
    price: "",
    amaount: "",
  });

  useEffect(() => {
    async function onLoad() {
      setTimeout(() => {
        let products = localStorage.getItem('products');
        if (products) products = JSON.parse(products);
        const product = products.find((product) => product.name === name);

        if (!product) {
          onError('Failed to load product. Try again later.');
          history.push("/products");
        }
        
        setProduct(product);
        setIsLoading(false);
      }, 3000);
    }
    onLoad();
  }, []);

  function validateForm() {
    return fields.name.length > 0 && fields.description.length > 0 && fields.price.length > 0;
  }

  async function handleSubmit(event) { //AKA handleUpdate
    event.preventDefault();

    setIsUpdating(true);
    setTimeout(() => {
      let products = localStorage.getItem('products');
      if (products) products = JSON.parse(products);

      let foundProduct = false;
      const updatedProducts = products.map((product) => {
        if (product.name === name) {
          foundProduct = true;
          product.name = fields.name;
          product.description = fields.description;
          product.price = fields.price;
          product.amount = fields.amount;
        }

        return product;
      });

      if (!foundProduct) {
        onError('Failed to update product. Try again later.');
        history.push("/products");
      }

      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      setIsUpdating(false);
      alert('Product Updated!');
    }, 3000);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
  
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setTimeout(() => {
      let products = localStorage.getItem('products');
      if (products) products = JSON.parse(products);

      const amountOfProducts = products.length;

      const updatedProducts = products.filter((product) => {
        if (product.name === name) return false;
        return true;
      });

      if (amountOfProducts === updatedProducts.length) {
        onError('Failed to delete product. Try again later.');
        history.push("/products");
      }

      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      setIsDeleting(false);
      alert('Product Deleted!');
      history.push("/products");
    }, 3000);
  }

  function renderProduct() {
    return (
      <Form onSubmit={handleSubmit}>
        <legend className="legend font-weight-bold text-muted active navbar-brand">Edit Product</legend>
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
    <div className="Product">
      {!isLoading && renderProduct()}
    </div>
  );
}
