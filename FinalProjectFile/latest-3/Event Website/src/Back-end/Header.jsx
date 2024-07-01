import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './header.css'
import { Image } from 'react-bootstrap'
import Logo from '../Images/logo1.png'


//creating a header component which is being displayed on the top of the page
const Header = () => {
  //getting the local storage for the user
  const [user, setUser] = useState(localStorage.getItem('user'));
  

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem('user'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  //incase of logout remove the user from the local storage
  const handleLogout = () => {
    localStorage.removeItem('user')
    alert('Logged out successfully')
    window.location.href = '/login'
  }
  return (
    <header>
      {/* Making a Navbar using Bootstrap  */}

      <Navbar expand='lg' className='navbar'>
        <Container>
          <Navbar.Brand as={Link} to='/' className='navbar-brand'>
            <Image
              src={Logo}
              alt='logo'
              width={120}
              height={80}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
                {/* Making a collpase incase of mobile phones display  */}
          <Navbar.Collapse id='basic-navbar-nav collpase1'>
            <Nav className='me-auto'>
              <Nav.Link as={NavLink} to='/' className='nav-link'>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to='/events' className='nav-link'>
                Events
              </Nav.Link>
              <Nav.Link as={NavLink} to='/create-card' className='nav-link'>
                Create Card
              </Nav.Link>
              <Nav.Link as={NavLink} to='/my-cards' className='nav-link'>
                My Cards
              </Nav.Link>
              <Nav.Link as={NavLink} to='/reserved-cards' className='nav-link'>
                Reserved Cards
              </Nav.Link>
              <Nav.Link as={NavLink} to='/contact' className='nav-link'>
                Contact
              </Nav.Link>
            </Nav>
            <Nav>
                    {/* Keeping a condition that if the user id is stored in the local storage it should disable the login and signup  */}
              {!user && (
                <>
                  <Nav.Link
                    as={NavLink}
                    to='/login'
                    className='nav-link login-link'
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to='/signup'
                    className='nav-link login-link'
                  >
                    Sign Up
                  </Nav.Link>
                </>
              )}
              {user && (
              <Nav.Link
                as={NavLink}
                to='/'
                className='nav-link login-link'
                onClick={handleLogout}
              >
                Logout
              </Nav.Link>
            )  
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
