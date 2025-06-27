import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import ProductList from './ProductList';
import Pagination from './Pagination';

const ShopProducts = ({
  totalPages,
  currentPage,
  onPageChange,
  products,
  onSortChange,
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('newtoOld');

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    onSortChange?.(selectedOption); // Pass to parent
  };

  return (
    <>
      <div className=" rounded p-3 mb-3 border-bottom border-2">
        <div className="row align-items-center gy-3">
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-sliders-h"></i>
                <span><strong>Filter</strong></span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <select
                  className="form-select form-select-sm border-0"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="newtoOld">Date, new to old</option>
                  <option value="oldtoNew">Date, old to new</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-md-end gap-3">
              <div className="d-flex align-items-center gap-2">
                <span><strong>View as</strong></span>
                <i
                  className={`fas fa-list ${viewMode === 'list' ? 'text-primary' : ''}`}
                  onClick={() => setViewMode('list')}
                  style={{ cursor: 'pointer' }}
                  title="List View"
                ></i>
                <i
                  className={`fas fa-th-large ${viewMode === 'grid' ? 'text-primary' : ''}`}
                  onClick={() => setViewMode('grid')}
                  style={{ cursor: 'pointer' }}
                  title="Grid View"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Views */}
      <div className="tab-content">
        {viewMode === 'grid' && (
          <div className="tab-pane fade show active">
            <ProductGrid product={products} />
          </div>
        )}
        {viewMode === 'list' && (
          <div className="tab-pane fade show active">
            <ProductList product={products} />
          </div>
        )}
      </div>

      {/* Pagination */}
{Array.isArray(products) && products.length > 0 ? (
  <Pagination
    totalPages={totalPages}
    currentPage={currentPage}
    onPageChange={onPageChange}
  />
) : (
  <p className="text-center text-muted" style={{marginTop:'150px'}}>No products available.</p>
)}
    </>
  );
};

export default ShopProducts;
