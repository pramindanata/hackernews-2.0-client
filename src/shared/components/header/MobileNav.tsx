import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import NavItems from './NavItems'
import Search from './Search'

const MobileNav = (): JSX.Element => {
  const location = useLocation()

  return (
    <>
      <Navbar.Brand as={Link} to="/" className="mobile-nav-item">
        <h5 className="m-0">Hacker News 2.0</h5>
      </Navbar.Brand>
      <Navbar.Toggle className="mobile-nav-item" aria-controls="navbar" />
      <Navbar.Collapse className="mobile-nav-item" id="navbar">
        <Nav activeKey={location.pathname} className="mb-2">
          <NavItems />
        </Nav>

        <Search />
      </Navbar.Collapse>
    </>
  )
}

export default MobileNav
