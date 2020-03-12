import React from 'react'
import { Nav } from 'react-bootstrap'
import styles from './style/navbar.module.css'

const NavItems = (): JSX.Element => {
  return (
    <>
      <Nav.Item>
        <Nav.Link eventKey="/news">News</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link eventKey="/submit">Submit</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link eventKey="/sign-in">Sign In</Nav.Link>
      </Nav.Item>

      <Nav.Item className={`ml-2 ${styles.signUpNavItem}`}>
        <button className="btn btn btn-outline-light">Sign Up</button>
      </Nav.Item>
    </>
  )
}

export default NavItems
