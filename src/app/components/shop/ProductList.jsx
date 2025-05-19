import React from 'react'
import ProductListItem from './ProductListItem'

const ProductList = ({product}) => {
  // const products = [
  //   { id: 1, image: 'assets/images/product/1.png', name: 'Fishing Retractable', price: 40.00, rating: 5, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  //   { id: 2, image: 'assets/images/product/2.png', name: 'Fishing Reels', price: 120.00, rating: 5, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  //   { id: 3, image: 'assets/images/product/3.png', name: 'Net Fishing Nets', price: 10.00, rating: 5, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  //   { id: 4, image: 'assets/images/product/4.png', name: 'Telescoping Pole Handle', price: 25.00, rating: 5, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  //   { id: 5, image: 'assets/images/product/5.png', name: 'Telescopic Fishing', price: 35.00, rating: 5, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  //   { id: 6, image: 'assets/images/product/6.png', name: 'Fishing Foldable', price: 65.00, rating: 5, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' }
  // ]

  return (
    <div className="row">
      <div className="col-md-12">
        {product.map(product => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList