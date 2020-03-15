import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import produce from 'immer'
import { useLocation } from 'react-router-dom'
import notifier from '@/lib/awn'
import { setSubmitModalShow, setNewsRefetch, setUser } from '@/store/action'
import * as I from '@/interface'
import InvalidFeedback from '@/shared/components/InvalidFeedback'
import NewsRequest from '@/request/news'

const SubmitModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector<I.Redux.State, I.Entity.User>(
    state => state.auth.user as I.Entity.User,
  )
  const show = useSelector<I.Redux.State, boolean>(state => state.modal.submit)

  const form = useRef<any>(null)

  /**
   * `submitted` = to trigger useEffect
   * `loading` = to prevent any dep's update trigger useEffect
   */
  const [loading, setLoading] = useState<boolean>(false)
  const [submited, setSubmited] = useState<boolean>(false)

  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [titleErr, setTitleErr] = useState<string | undefined>(undefined)
  const [urlErr, setUrlErr] = useState<string | undefined>(undefined)

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmited(true)
  }, [])

  const resetError = useCallback(() => {
    setTitleErr('')
    setUrlErr('')
  }, [])

  const resetFields = useCallback(() => {
    resetError()
    setTitle('')
    setUrl('')
  }, [resetError])

  const handleHide = useCallback(() => {
    dispatch(setSubmitModalShow(false))
  }, [dispatch])

  const updateUser = useCallback(() => {
    const newUser = produce(user, draft => {
      const newsCount = draft.newsCount as number

      draft.newsCount = newsCount + 1
    })

    dispatch(setUser(newUser))
  }, [dispatch, user])

  const store = useCallback(async () => {
    await NewsRequest.store({
      title,
      url,
    })
  }, [title, url])

  useEffect(() => {
    if (submited && !loading) {
      setLoading(true)
      resetError()

      store()
        .then(() => {
          handleHide()

          if (location.pathname === '/' || location.pathname === '/profile') {
            // reload news
            dispatch(setNewsRefetch(true))
          }

          updateUser()
          notifier.success('Post submitted')
        })
        .catch(err => {
          const { response } = err

          if (response.status === 422) {
            const { body } = response.data.data
            setTitleErr(body.title)
            setUrlErr(body.url)
          }
        })
        .finally(() => {
          setSubmited(false)
          setLoading(false)
        })
    }
  }, [
    submited,
    store,
    loading,
    handleHide,
    resetError,
    dispatch,
    location,
    updateUser,
  ])

  return (
    <Modal show={show} onHide={handleHide} onShow={resetFields}>
      <Modal.Header closeButton>
        <Modal.Title as="h5">Submit</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit} ref={form}>
        <Modal.Body>
          <Form.Group controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              required
              value={url}
              onChange={(e: any): void => setUrl(e.target.value)}
            />
            <InvalidFeedback message={urlErr} />
          </Form.Group>

          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              required
              value={title}
              onChange={(e: any): void => setTitle(e.target.value)}
            />
            <InvalidFeedback message={titleErr} />
          </Form.Group>
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

export default SubmitModal
