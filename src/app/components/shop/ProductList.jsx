import React from 'react'
import ProductListItem from './ProductListItem'

const ProductList = ({product}) => {
  return (
    <div className="row mt-4">
      <div className="col-md-12">
        {product.map(product => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList