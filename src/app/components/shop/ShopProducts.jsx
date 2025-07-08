import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import ProductList from './ProductList';
import Pagination from './Pagination';
import ShopSidebar from './ShopSidebar';

const ShopProducts = ({
  totalPages,
  currentPage,
  onPageChange,
  products,
  onSortChange,
  // Add these props for the sidebar
  brands,
  onCategoriesChange,
  onBrandsChange,
  selectedCategories = [],
  selectedBrands = [],
  onVariantsChange,
  onPriceChange,
  slug
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('newtoOld');
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    onSortChange?.(selectedOption);
  };

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <div className="rounded p-3 mb-3 border-bottom border-2">
        {/* Mobile View - Flex Column */}
        <div className="d-flex d-md-none flex-column gap-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <i 
                className="fas fa-sliders-h"
                onClick={toggleOffcanvas}
                style={{ cursor: 'pointer' }}
                title="Filter"
              ></i>
              <span><strong>Filter</strong></span>
            </div>
            <div className="d-flex align-items-center gap-2">
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
          <div className="w-100">
            <select
              className="form-select form-select-sm border-0 w-100"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="newtoOld">Date, new to old</option>
              <option value="oldtoNew">Date, old to new</option>
            </select>
          </div>
        </div>

        {/* Desktop View - Keep original style */}
        <div className="d-none d-md-block">
          <div className="row align-items-center gy-3">
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-sliders-h "></i>
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
      </div>

      {/* Mobile Offcanvas Sidebar */}
      <div className={`offcanvas offcanvas-start ${showOffcanvas ? 'show' : ''}`} 
           tabIndex="-1" 
           id="filterOffcanvas"
           style={{ 
             visibility: showOffcanvas ? 'visible' : 'hidden',
             transform: showOffcanvas ? 'translateX(0)' : 'translateX(-100%)',
             transition: 'transform 0.3s ease-in-out',
             zIndex: 1045
           }}>
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="filterOffcanvasLabel">
            <i className="fas fa-sliders-h me-2"></i>
            Filters
          </h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={closeOffcanvas}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="p-3">
            <ShopSidebar
              brands={brands}  
              onCategoriesChange={onCategoriesChange}
              onBrandsChange={onBrandsChange}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              onVariantsChange={onVariantsChange}
              onPriceChange={onPriceChange}
              slug={slug}
            />
          </div>
        </div>
      </div>

      {/* Backdrop for mobile offcanvas */}
      {showOffcanvas && (
        <div 
          className="offcanvas-backdrop fade show"
          onClick={closeOffcanvas}
          style={{ zIndex: 1040 }}
        ></div>
      )}

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