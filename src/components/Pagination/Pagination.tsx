import React from 'react'
import './Pagination.scss'

interface PropsInterface {
  page: number,
  setPage: (page: number) => void
}

const Pagination = ({ page, setPage }: PropsInterface) => {
  const preparePagination = () => {
    const pages = []
    if (page < 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (page >= 3) {
      for (let i = page - 2; i <= page + 2; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  return (
    <ul className='pagination'>
      {preparePagination().map((pageIterator) => (
        <li
          className={`pagination__item ${pageIterator === page ? 'pagination__item--active' : ''}`}
          key={pageIterator}
          onClick={() => { pageIterator !== page && setPage(pageIterator) }}
        >
          {pageIterator}
        </li>
      ))}
    </ul>
  )
}

export default Pagination
