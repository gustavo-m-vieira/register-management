import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import { SpinnerDiamond } from 'spinners-react';

import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      setTimeout(() => {
        let products = localStorage.getItem('products');
        if (products) products = JSON.parse(products);
        setProducts(products);
      }, 3000);

      setIsLoading(false);
    }
    onLoad();
  }, []);

  function renderProduct({ name, description, price, amount }) {
    return (
      <LinkContainer key={name} to={`/products/${name}`}>
        <ListGroup.Item action className="productItem">
          <span className="font-weight-bold">
            {name}
          </span>
          <br />
          <div className="infos">
            <span className="text-muted">
              {description}
            </span>
          </div>
        </ListGroup.Item>
      </LinkContainer>
    );
  }

  return (
    <div className="Products">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Products</h2>
      <ListGroup>
        <LinkContainer to="/products/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new product</span>
          </ListGroup.Item>
        </LinkContainer>
        {
          isLoading || !products || !products.length ?
          <ListGroup.Item className="py-3 text-nowrap text-truncate loading-spinner">
            <SpinnerDiamond color="black" secondaryColor="gray"/>
          </ListGroup.Item>
          :
          products.map((product) => renderProduct(product))
        }
      </ListGroup>
    </div>
  );
}

