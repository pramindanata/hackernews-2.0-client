import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import notifier from '@/lib/awn'
import { setEditNewsModalShow, setNewsRefetch } from '@/store/action'
import * as I from '@/interface'
import InvalidFeedback from '@/shared/components/InvalidFeedback'
import NewsRequest from '@/request/news'

const EditNewsModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const location = useLocation()
  const news = useSelector<I.Redux.State, any>(
    state => state.modal.editNewsPayload,
  )
  const show = useSelector<I.Redux.State, boolean>(
    state => state.modal.editNews,
  )

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

  const handleHide = useCallback(() => {
    dispatch(
      setEditNewsModalShow({
        active: false,
      }),
    )
  }, [dispatch])

  useEffect(() => {
    setTitle(news.title)
    setUrl(news.url)
  }, [news])

  const update = useCallback(async () => {
    await NewsRequest.update(news.id, {
      title,
      url,
    })
  }, [title, url, news])

  useEffect(() => {
    if (submited && !loading) {
      setLoading(true)
      resetError()

      update()
        .then(() => {
          handleHide()

          dispatch(setNewsRefetch(true))

          notifier.success('Post updated')
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
  }, [submited, loading, update, handleHide, resetError, dispatch, location])

  return (
    <Modal show={show} onHide={handleHide} onShow={resetError}>
      <Modal.Header closeButton>
        <Modal.Title as="h5">Update Data</Modal.Title>
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

export default EditNewsModal
