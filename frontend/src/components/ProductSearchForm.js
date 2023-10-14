import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Form, FormControl } from 'react-bootstrap'

function ProductSearchForm() {
  const [keyword, setKeyword] = useState('')
  const history = useHistory()

  const searchHandler = (e) => {
    e.preventDefault()
    history.push(`/search/${keyword}`)
    setKeyword('')
  }

  return (
    <Form inline className="search-form mx-auto" onSubmit={searchHandler}>
      <FormControl type="search" placeholder="Search..." className="mr-sm-2 searchInput" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <button type="submit" className="btn btn-green--bordered hidden-below-1000">
        Search
      </button>
    </Form>
  )
}

export default ProductSearchForm
