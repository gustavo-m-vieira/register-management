import React from "react";
import { Route, Switch } from "react-router-dom";

import { useAppContext } from "./libs/contextLib";

// PAGES
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NotAuthorized from "./pages/NotAuthorized";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewClient from "./pages/NewClient";
import NewProduct from "./pages/NewProduct";
import Clients from "./pages/Clients";
import Client from "./pages/Client";
import Products from "./pages/Products";
import Product from "./pages/Product";

export default function Routes() {
  const { isAuthenticated } = useAppContext();

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/clients/new">
        {isAuthenticated ? <NewClient /> : <NotAuthorized />}
      </Route>
      <Route exact path="/products/new">
      {isAuthenticated ? <NewProduct /> : <NotAuthorized />}
      </Route>
      <Route exact path="/clients">
      {isAuthenticated ? <Clients /> : <NotAuthorized />}
      </Route>
      <Route exact path="/clients/:email">
      {isAuthenticated ? <Client /> : <NotAuthorized />}
      </Route>
      <Route exact path="/products">
      {isAuthenticated ? <Products /> : <NotAuthorized />}
      </Route>
      <Route exact path="/products/:name">
      {isAuthenticated ? <Product /> : <NotAuthorized />}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}