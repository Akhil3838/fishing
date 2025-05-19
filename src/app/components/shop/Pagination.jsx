import React from 'react';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = [];

  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 fishto-pagination text-center">
        <a
          className={`next ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageClick(currentPage - 1)}
          style={{ cursor: 'pointer' }}
        >
          <i className="nss-chevron-left1"></i>
        </a>

        {pageNumbers.map((number) => (
          <span
            key={number}
            className={number === currentPage ? 'current' : ''}
            style={{ cursor: 'pointer', margin: '0 5px' }}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </span>
        ))}

        <a
          className={`next ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageClick(currentPage + 1)}
          style={{ cursor: 'pointer' }}
        >
          <i className="nss-chevron-right1"></i>
        </a>
      </div>
    </div>
  );
}

export default Pagination;