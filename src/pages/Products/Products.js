import React, { useEffect, useState, Fragment } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

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

  function renderProductsList(products) {
    return (
      <Fragment>
        <LinkContainer to="/products/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new product</span>
          </ListGroup.Item>
        </LinkContainer>
        {
          products.map((product) => renderProduct(product))
        }
      </Fragment>
    );
  }

  return (
    <div className="Products">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Products</h2>
      <ListGroup>{!isLoading && renderProductsList(products)}</ListGroup>
    </div>
  );
}

