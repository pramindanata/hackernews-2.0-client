import React, { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import * as I from '@/interface'

interface Props {
  initialSort: I.NewsFilter['sort']
  initialOrder: I.NewsFilter['order']
  onChange: (sort: I.NewsFilter['sort'], order: I.NewsFilter['order']) => void
}

const Filter = (props: Props): JSX.Element => {
  const { onChange, initialOrder, initialSort } = props

  const [sort, setSort] = useState<I.NewsFilter['sort']>(initialSort)
  const [order, setOrder] = useState<I.NewsFilter['order']>(initialOrder)

  useEffect(() => {
    onChange(sort, order)
  }, [sort, order, onChange])

  return (
    <Row>
      <Col sm={6} md={4} lg={3}>
        <Form.Group controlId="sort">
          <Form.Label className="text-sm">Sort By</Form.Label>
          <Form.Control
            size="sm"
            as="select"
            value={sort}
            onChange={(e: any): void => setSort(e.target.value)}
          >
            <option value="published">Published</option>
            <option value="vote">Vote</option>
          </Form.Control>
        </Form.Group>
      </Col>

      <Col sm={6} md={4} lg={3}>
        <Form.Group controlId="sort">
          <Form.Label className="text-sm">Order</Form.Label>
          <Form.Control
            size="sm"
            as="select"
            value={order}
            onChange={(e: any): void => setOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  )
}

export default Filter
