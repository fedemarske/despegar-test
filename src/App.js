import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { Container, Navbar, NavbarBrand, Nav } from 'reactstrap';
import BuscadorDelivery from './BuscadorDelivery'
import Delivery from './Delivery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './custom.scss'
import { getAllDeliveries } from './utils/delivery'
import mock from './mock.json'

const App = () => {
  const deliveries = getAllDeliveries();
  if(deliveries.length === 0) {
    sessionStorage.setItem('deliveries', JSON.stringify(mock))
  }
  return (
    <React.Fragment>
      <header className="delivery-header">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Delivery Online</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavbarBrand href="/">Despegar.com</NavbarBrand>
          </Nav>
        </Navbar>
      </header>
      <Container>
        <Router>
            <BuscadorDelivery path="/" />
            <Delivery path="/delivery/" />
            <Delivery path="/delivery/:deliveryId" />
        </Router>
      </Container>
      <footer>
        <Navbar color="dark" dark expand="md" className="delivery-footer">
        </Navbar>
      </footer>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));