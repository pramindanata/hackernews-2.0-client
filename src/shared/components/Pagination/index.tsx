import React from 'react'
import ReactPaginate from 'react-paginate'

interface Props {
  pageCount: number
  pageRangeDisplayed?: number
  marginPagesDisplayed?: number
  initialPage?: number
  forcePage?: number
  onPageChange?: (selectedItem: { selected: number }) => void
}

const Pagination = (props: Props): JSX.Element => {
  const {
    pageCount,
    pageRangeDisplayed,
    marginPagesDisplayed,
    initialPage,
    forcePage,
    onPageChange,
  } = props

  return (
    <ReactPaginate
      onPageChange={onPageChange || undefined}
      breakLabel="..."
      breakClassName="btn btn-outline"
      containerClassName="btn-group px-0"
      pageClassName="btn btn-outline-primary p-0"
      pageLinkClassName="btn"
      activeClassName="btn btn-outline-primary active"
      nextLinkClassName="btn"
      nextClassName="btn btn-outline-primary ml-2 p-0"
      previousLinkClassName="btn"
      previousClassName="btn btn-outline-primary mr-2 p-0"
      forcePage={forcePage || 0}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed || 3}
      marginPagesDisplayed={marginPagesDisplayed || 3}
      initialPage={initialPage || 0}
    />
  )
}

export default Pagination
