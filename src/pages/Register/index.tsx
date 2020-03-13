import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import InvalidFeedback from '@/shared/components/InvalidFeedback'
import AuthRequest from '@/request/auth'

const Register = (): JSX.Element => {
  const [baseErrorMessage, setBaseErrorMessage] = useState('')
  const [submited, setSubmited] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [usernameErr, setUsernameErr] = useState<string | undefined>(undefined)
  const [passwordErr, setPasswordErr] = useState<string | undefined>(undefined)
  const [emailErr, setEmailErr] = useState<string | undefined>(undefined)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setSubmited(true)
  }

  const resetError = (): void => {
    setBaseErrorMessage('')
    setUsernameErr('')
    setPasswordErr('')
  }

  useEffect(() => {
    async function register(): Promise<void> {
      resetError()

      try {
        const res = await AuthRequest.register({
          username,
          password,
          email,
        })

        // Set token and redirect
        localStorage.setItem('token', res.token)
        window.location.href = '/'
      } catch (err) {
        const { response } = err

        if (response.status !== 422) {
          setBaseErrorMessage(response.data.message)
        } else {
          const { body } = response.data.data
          setUsernameErr(body.username)
          setEmailErr(body.email)
          setPasswordErr(body.password)
        }

        setSubmited(false)
      }
    }

    if (submited) {
      register()
    }
  }, [submited, username, password, email])

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div>
        <Row>
          <Col
            sm={{ span: 0, offset: 2 }}
            md={{ span: 0, offset: 3 }}
            lg={{ span: 0, offset: 4 }}
          />
          <Col sm={8} md={6} lg={4}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-4 text-center">Sign Up</Card.Title>

                <Alert show={baseErrorMessage !== ''} variant="danger">
                  {baseErrorMessage}
                </Alert>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={username}
                      onChange={(e: any): void => setUsername(e.target.value)}
                    />
                    <InvalidFeedback message={usernameErr} />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={email}
                      onChange={(e: any): void => setEmail(e.target.value)}
                    />
                    <InvalidFeedback message={emailErr} />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      value={password}
                      onChange={(e: any): void => setPassword(e.target.value)}
                    />
                    <InvalidFeedback message={passwordErr} />
                  </Form.Group>

                  <Button
                    variant="success"
                    block
                    type="submit"
                    disabled={submited}
                  >
                    {submited ? 'Loading…' : 'Submit'}
                  </Button>

                  <div className="text-center my-3">
                    <span className="text-sm">Already have an account ?</span>
                  </div>

                  <Button as={Link} to="/login" block variant="secondary">
                    Sign In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Register
