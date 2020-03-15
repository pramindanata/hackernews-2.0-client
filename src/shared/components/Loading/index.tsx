import React from 'react'
import { Helmet } from 'react-helmet'
import { Spinner } from 'react-bootstrap'
import styles from '@/shared/components/Loading/index.module.css'

const Loading = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Loading...</title>
      </Helmet>

      <div className={`bg-primary ${styles.wrapper}`}>
        <Spinner
          animation="border"
          variant="light"
          role="status"
          className={styles.spinner}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
        <div className="mt-3 lead text-light">Please wait</div>
      </div>
    </>
  )
}

export default Loading
