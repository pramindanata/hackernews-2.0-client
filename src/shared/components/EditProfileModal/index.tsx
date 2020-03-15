import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Alert, Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import produce from 'immer'
import { setEditProfileModalShow, setUser } from '@/store/action'
import * as I from '@/interface'
import InvalidFeedback from '@/shared/components/InvalidFeedback'
import AuthRequest from '@/request/auth'

const EditProfileModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const user = useSelector<I.Redux.State, I.Entity.User>(
    state => state.auth.user as I.Entity.User,
  )
  const show = useSelector<I.Redux.State, boolean>(
    state => state.modal.editProfile,
  )

  const form = useRef<any>(null)

  /**
   * `submitted` = to trigger useEffect
   * `loading` = to prevent any dep's update trigger useEffect
   */
  const [loading, setLoading] = useState<boolean>(false)
  const [submited, setSubmited] = useState<boolean>(false)
  const [successAlert, setSuccessAlert] = useState<boolean>(false)

  const [username, setUsername] = useState<string>(user.username)
  const [email, setEmail] = useState<string>(user.email as string)
  const [password, setPassword] = useState<string>('')
  const [usernameErr, setUsernameErr] = useState<string | undefined>(undefined)
  const [emailErr, setEmailErr] = useState<string | undefined>(undefined)
  const [passwordErr, setPasswordErr] = useState<string | undefined>(undefined)

  const handleHide = useCallback(() => {
    dispatch(setEditProfileModalShow(false))
  }, [dispatch])

  const resetFields = useCallback(() => {
    setUsername(user.username)
    setEmail(user.email as string)
    setPassword('')

    setUsernameErr('')
    setEmailErr('')
    setPasswordErr('')
    setSuccessAlert(false)
  }, [user])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmited(true)
  }, [])

  const resetError = useCallback(() => {
    setUsernameErr('')
    setEmailErr('')
    setPasswordErr('')
  }, [])

  const updateUser = useCallback(() => {
    const newUser = produce(user, draft => {
      draft.username = username
      draft.email = email
    })

    dispatch(setUser(newUser))
  }, [dispatch, user, username, email])

  const update = useCallback(async () => {
    await AuthRequest.update({
      username,
      email,
      password,
    })
  }, [username, email, password])

  useEffect(() => {
    if (submited && !loading) {
      setLoading(true)
      setSuccessAlert(false)
      resetError()

      update()
        .then(() => {
          setSuccessAlert(true)

          updateUser()
        })
        .catch(err => {
          const { response } = err

          if (response.status === 422) {
            const { body } = response.data.data
            setUsernameErr(body.username)
            setEmailErr(body.email)
            setPasswordErr(body.password)
          }
        })
        .finally(() => {
          setSubmited(false)
          setLoading(false)
        })
    }
  }, [submited, loading, update, handleHide, resetError, dispatch, updateUser])

  return (
    <Modal show={show} onHide={handleHide} onShow={resetFields}>
      <Modal.Header closeButton>
        <Modal.Title as="h5">Edit Profile</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit} ref={form}>
        <Modal.Body>
          <Alert
            show={successAlert}
            variant="success"
            dismissible
            onClose={(): any => setSuccessAlert(false)}
          >
            Profile updated
          </Alert>

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
              value={password}
              onChange={(e: any): void => setPassword(e.target.value)}
            />
            <InvalidFeedback message={passwordErr} />
          </Form.Group>

          <input type="submit" hidden />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleHide}>
            Close
          </Button>
          <Button variant="secondary" type="submit" disabled={loading}>
            {!loading ? 'Submit' : 'Loading'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditProfileModal
