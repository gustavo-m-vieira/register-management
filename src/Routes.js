import React from "react";
import { Route, Switch } from "react-router-dom";

// PAGES
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}