import React, { useCallback, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

interface Props {
  formClassName?: string
  formControlClassName?: string
}

const Search = (props: Props): JSX.Element => {
  const { formClassName, formControlClassName } = props
  const history = useHistory()
  const [search, setSearch] = useState<string>('')
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const q = search
      setSearch('')
      history.push(`/?q=${q}`)
    },
    [history, search],
  )

  return (
    <Form inline className={formClassName} onSubmit={handleSubmit}>
      <Form.Control
        className={`w-100 ${formControlClassName}`}
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e: any): void => setSearch(e.target.value)}
      />
    </Form>
  )
}

export default Search
