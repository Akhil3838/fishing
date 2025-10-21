import React, { useState } from 'react';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const [loading, setLoading] = useState(false);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageClick = async (page) => {
    if (page !== currentPage && page !== '...') {
      setLoading(true);
      // 👇 Smoothly scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        await onPageChange(page); // call parent handler (can be async)
      } finally {
        setTimeout(() => setLoading(false), 500); // hide loader after short delay
      }
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 fishto-pagination text-center">
        {/* Prev Button */}
        <a
          className={`next ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageClick(currentPage - 1)}
          style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        >
          <i className="nss-chevron-left1"></i>
        </a>

        {/* Page Numbers */}
        {getPageNumbers().map((number, index) => (
          <span
            key={index}
            className={number === currentPage ? 'current' : ''}
            style={{
              cursor: number === '...' ? 'default' : 'pointer',
              margin: '0 5px',
              opacity: number === '...' ? 0.6 : 1,
            }}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </span>
        ))}

        {/* Next Button */}
        <a
          className={`next ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageClick(currentPage + 1)}
          style={{
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          <i className="nss-chevron-right1"></i>
        </a>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-3">
            <div
              className="spinner-border text-dark"
              role="status"
              style={{ width: '1.5rem', height: '1.5rem' }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
