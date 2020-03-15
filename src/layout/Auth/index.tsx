import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import styles from '@/layout/Auth/index.module.css'

const Auth = (props: any): JSX.Element => {
  const year = new Date().getFullYear()

  return (
    <Container className={styles.container}>
      <div className={`py-5 ${styles.wrapper}`}>
        <div className="mb-5 text-center">
          <Link to="/" className={styles.header}>
            <h4>Hacker News 2.0</h4>
          </Link>
        </div>

        {props.children}

        <div className="mt-5 text-center">
          <div>
            <span className={styles.copyright}>&copy;</span> {year} cool_snek
          </div>
          <div className="text-sm text-muted">
            Developed by <span>Eksa Pramindanata</span>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Auth
