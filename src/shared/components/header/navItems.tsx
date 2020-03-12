import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './style/navbar.module.css'

const NavItems = (): JSX.Element => {
  return (
    <>
      <Nav.Item>
        <Nav.Link as={Link} to="/" eventKey="/news">
          News
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link eventKey="/submit">Submit</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/login" eventKey="/login">
          Sign In
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className={`ml-2 ${styles.signUpNavItem}`}>
        <Nav.Link
          as={Link}
          to="/register"
          eventKey="/register"
          className={`btn btn btn-outline-light ${styles.signUpNavButton}`}
        >
          Sign Up
        </Nav.Link>
      </Nav.Item>
    </>
  )
}

export default NavItems
