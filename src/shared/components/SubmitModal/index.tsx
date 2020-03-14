import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setSubmitModalShow, setNewsRefetch } from '@/store/action'
import * as I from '@/interface'
import InvalidFeedback from '@/shared/components/InvalidFeedback'
import NewsRequest from '@/request/news'

const SubmitModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const location = useLocation()
  const show = useSelector<I.Redux.State, boolean>(state => state.modal.submit)
  const handleHide = useCallback(() => dispatch(setSubmitModalShow(false)), [
    dispatch,
  ])

  const form = useRef<any>(null)
  const [submited, setSubmited] = useState<boolean>(false)

  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [titleErr, setTitleErr] = useState<string | undefined>(undefined)
  const [urlErr, setUrlErr] = useState<string | undefined>(undefined)

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmited(true)
  }, [])

  const handleClick = useCallback(() => {
    form.current.dispatchEvent(new Event('submit'))
  }, [form])

  const resetError = useCallback(() => {
    setTitleErr('')
    setUrlErr('')
  }, [])

  const store = useCallback(async () => {
    await NewsRequest.store({
      title,
      url,
    })

    setSubmited(false)
  }, [title, url])

  useEffect(() => {
    resetError()

    if (submited) {
      store()
        .then(() => {
          setTitle('')
          setUrl('')
          handleHide()

          if (location.pathname === '/') {
            // reload news
            dispatch(setNewsRefetch(true))
          }
        })
        .catch(err => {
          const { response } = err

          if (response.status === 422) {
            const { body } = response.data.data
            setTitleErr(body.title)
            setUrlErr(body.url)
          }
        })
    }
  }, [submited, store, handleHide, resetError, dispatch, location])

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title as="h5">Submit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} ref={form}>
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
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleHide}>
          Close
        </Button>
        <Button variant="secondary" onClick={handleClick}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SubmitModal
