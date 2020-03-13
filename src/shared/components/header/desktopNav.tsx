import React from 'react'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavItems from './NavItems'
import styles from './style/navbar.module.css'

const MobileNav = (): JSX.Element => {
  return (
    <>
      <Form inline className="desktop-nav-item">
        <FormControl
          className={`w-100 ${styles.searchWrapper}`}
          type="text"
          placeholder="Search..."
        />
      </Form>

      <Navbar.Brand as={Link} to="/" className="desktop-nav-item">
        <h5 className="m-0">Hacker Rank 2.0</h5>
      </Navbar.Brand>

      <Nav
        className={`desktop-nav-item ${styles.navWrapper}`}
        activeKey="/news"
      >
        <NavItems />
      </Nav>
    </>
  )
}

export default MobileNav
