import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '@/layout/Auth/index.module.css'

const Auth = (props: any): JSX.Element => {
  const year = new Date().getFullYear()

  return (
    <Container className={styles.container}>
      <div className={`py-5 ${styles.wrapper}`}>
        <div className="mb-4">
          <a href="/" className={styles.header}>
            <h4>Hacker News 2.0</h4>
          </a>
        </div>

        {props.children}

        <div className="mt-4">
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
