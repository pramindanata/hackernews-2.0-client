import React from 'react'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavItems from './NavItems'

const MobileNav = (): JSX.Element => {
  return (
    <>
      <Navbar.Brand as={Link} to="/" className="mobile-nav-item">
        <h5 className="m-0">Hacker Rank 2.0</h5>
      </Navbar.Brand>
      <Navbar.Toggle className="mobile-nav-item" aria-controls="navbar" />
      <Navbar.Collapse className="mobile-nav-item" id="navbar">
        <Nav activeKey="/news" className="mb-2">
          <NavItems />
        </Nav>

        <Form inline>
          <FormControl className="w-100" type="text" placeholder="Search..." />
        </Form>
      </Navbar.Collapse>
    </>
  )
}

export default MobileNav
