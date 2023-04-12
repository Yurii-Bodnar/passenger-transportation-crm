import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectToken } from 'redux/auth/authSelectors';
import css from './Header.module.css';

const Header = () => {
  const isAuth = useSelector(selectToken);
  return (
    <>
      {isAuth ? (
        <Navbar bg="light" expand="expand" className="mb-5 ">
          <Container className="d-flex  m-0 ">
            <Navbar.Toggle aria-controls={false} />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-expand"
              aria-labelledby="passengerTransportation-expand-expand"
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="passengerTransportation-expand-expand">
                  Passenger Transportation
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {' '}
                  <Nav.Link to="/login" as={Link}>
                    home
                  </Nav.Link>
                  <Nav.Link to="/" as={Link}>
                    Link
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ) : (
        <Navbar bg="light" expand="expand" className="mb-5 ">
          {' '}
          <h1 style={{ paddingLeft: '10px' }}>Passenger Transportation</h1>
        </Navbar>
      )}
    </>
  );
};

export default Header;
