import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import ProductList from './ProductList';
import Pagination from './Pagination';

const ShopProducts = ({ totalPages, currentPage, onPageChange, products }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  return (
    <>
      <div className="bg-ligh rounded p-3 mb-3">
        <div className="row align-items-center gy-3">
          {/* Left Controls: Filter and Sort */}
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-sliders-h"></i>
                <span><strong>Filter</strong></span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span><strong>Sort by</strong></span>
                <span>Date, new to old</span>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>

          {/* Right Controls: Compare and View As */}
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-md-end gap-3">
              <div className="d-flex align-items-center gap-2">
                {/* <span><strong>Compare</strong></span> */}
                {/* <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="compareSwitch"
                    defaultChecked
                  />
                </div> */}
              </div>

              {/* View As (Click to toggle view mode) */}
              <div className="d-flex align-items-center gap-2">
                <span><strong>View as</strong></span>
                <i
                  className={`fas fa-list cursor-pointer ${viewMode === 'list' ? 'text-primary' : ''}`}
                  onClick={() => setViewMode('list')}
                  style={{ cursor: 'pointer' }}
                  title="List View"
                ></i>
                <i
                  className={`fas fa-th-large cursor-pointer ${viewMode === 'grid' ? 'text-primary' : ''}`}
                  onClick={() => setViewMode('grid')}
                  style={{ cursor: 'pointer' }}
                  title="Grid View"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Info */}
      {/* <div className="row mb-3">
        <div className="col-md-7">
          <p className="show-result">Showing all {products.length} results</p>
        </div>
        <div className="col-md-5">
          <SortDropdown />
        </div>
      </div> */}

      {/* Product Views */}
      <div className="tab-content">
        {viewMode === 'grid' && (
          <div className="tab-pane fade show active" id="grid" role="tabpanel">
            <ProductGrid product={products} />
          </div>
        )}
        {viewMode === 'list' && (
          <div className="tab-pane fade show active" id="list" role="tabpanel">
            <ProductList product={products} />
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

const SortDropdown = () => {
  return (
    <div className="sorting">
      <select name="orderby" className="orderby">
        <option value="sorting" defaultValue>Default sorting</option>
        <option value="new">Newest Products</option>
        <option value="popular">Popular Products</option>
        <option value="rating">Average Rating</option>
        <option value="price">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default ShopProducts;
