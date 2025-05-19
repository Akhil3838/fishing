import React from 'react'
import ProductGrid from './ProductGrid'
import ProductList from './ProductList'
import Pagination from './Pagination'

const ShopProducts = ({ totalPages, currentPage, onPageChange, products }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <ViewToggle />
          <p className="show-result">Showing all 15 results</p>
        </div>
        <div className="col-md-5">
          <SortDropdown />
        </div>
      </div>
      
      <div className="tab-content">
        <div className="tab-pane fade show in active" id="gird" role="tabpanel">
          <ProductGrid product={products} />
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={onPageChange} 
          />
        </div>
        
        <div className="tab-pane fade in" id="list" role="tabpanel">
          <ProductList product={products} />
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={onPageChange} 
          />
        </div>
      </div>
    </>
  )
}

// ... keep ViewToggle and SortDropdown the same ...
const ViewToggle = () => {
  return (
    <ul className="toolbar-btn nav nav-tabs">
      <li><a className="active" href="#gird" data-toggle="tab"><span></span><span></span><span></span><span></span></a></li>
      <li><a className="list" href="#list" data-toggle="tab"><span></span><span></span><span></span></a></li>
    </ul>
  )
}

const SortDropdown = () => {
  return (
    <div className="sorting">
      <select name="orderby" className="orderby">
        <option value="sorting" selected="selected">Default sorting</option>
        <option value="new">Newest Products</option>
        <option value="popular">Popular Products</option>
        <option value="rating">Average Rating</option>
        <option value="price">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  )
}


export default ShopProducts