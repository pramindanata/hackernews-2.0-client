import React from 'react'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import NavItems from './navItems'

const MobileNav = (): JSX.Element => {
  return (
    <>
      <Navbar.Brand className="mobile-nav-item">Hacker Rank 2.0</Navbar.Brand>
      <Navbar.Toggle className="mobile-nav-item" aria-controls="navbar" />
      <Navbar.Collapse className="mobile-nav-item" id="navbar">
        <Nav activeKey="/news">
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
