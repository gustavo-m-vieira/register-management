import React, { useEffect, useState, Fragment } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

import './Clients.css';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      setTimeout(() => {
        let clients = localStorage.getItem('clients');
        if (clients) clients = JSON.parse(clients);
        setClients(clients);
      }, 3000);

      setIsLoading(false);
    }
    onLoad();
  }, []);

  function renderClient({ name, email, address }) {
    return (
      <LinkContainer key={email} to={`/clients/${email}`}>
        <ListGroup.Item action className="clientItem">
          <span className="font-weight-bold">
            {name}
          </span>
          <br />
          <div className="infos">
            <span className="text-muted">
              Address: {address}
            </span>
            <span className="text-muted">
              Email: {email}
            </span>
          </div>
        </ListGroup.Item>
      </LinkContainer>
    );
  }

  function renderClientsList(clients) {
    return (
      <Fragment>
        <LinkContainer to="/clients/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new client</span>
          </ListGroup.Item>
        </LinkContainer>
        {
          clients.map((client) => renderClient(client))
        }
      </Fragment>
    );
  }

  return (
    <div className="Clients">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Clients</h2>
      <ListGroup>{!isLoading && renderClientsList(clients)}</ListGroup>
    </div>
  );
}

