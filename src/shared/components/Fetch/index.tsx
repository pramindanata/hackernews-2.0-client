import React, { useState, useEffect } from 'react'

interface Props {
  request: () => Promise<any>
  onSuccess: (data: any) => any
}

const Fetch = (props: React.PropsWithChildren<Props>): JSX.Element => {
  const { children, request, onSuccess } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [ready, setReady] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorCode, setErrorCode] = useState<number>()

  useEffect(() => {
    if (!ready && !loading) {
      setLoading(true)
      request()
        .then(res => {
          onSuccess(res)
        })
        .catch(err => {
          const { response } = err

          setError(true)
          setErrorCode(response.status)
        })
        .finally(() => {
          setReady(true)
          setLoading(true)
        })
    }
  }, [ready, onSuccess, request, loading])

  if (!ready) {
    return <div>Loading...</div>
  }

  if (error) {
    let message: string

    if (error && errorCode === 404) {
      message = 'Data not found'
    } else {
      message = 'Something went wrong :('
    }

    return (
      <div className="text-center mt-4">
        <h2 className="text-primary">Woops !</h2>
        <p className="lead">{message}</p>
      </div>
    )
  }

  return <>{children}</>
}

export default Fetch
