import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ product = [] }) => {
  console.log(product);

  return (
    <div className="row">
      {product.map(product => (
        <div key={product.id} className="col-6 col-lg-4 col-md-6 mb-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
