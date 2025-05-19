import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({product}) => {
  // const products = [
  //   { id: 1, image: 'assets/images/product/1.png', name: 'Fishing Retractable', price: 40.00, rating: 5 },
  //   { id: 2, image: 'assets/images/product/2.png', name: 'Fishing Reels', price: 120.00, rating: 5 },
  //   { id: 3, image: 'assets/images/product/3.png', name: 'Net Fishing Nets', price: 10.00, rating: 5 },
  //   { id: 4, image: 'assets/images/product/4.png', name: 'Telescoping Pole Handle', price: 43.00, rating: 5 },
  //   { id: 5, image: 'assets/images/product/5.png', name: 'Telescopic Fishing', price: 67.00, rating: 5 },
  //   { id: 6, image: 'assets/images/product/6.png', name: 'Fishing Foldable', price: 65.00, rating: 5 },
  //   { id: 7, image: 'assets/images/product/7.png', name: 'Durable Nylon Mesh', price: 65.00, rating: 5 },
  //   { id: 8, image: 'assets/images/product/8.png', name: 'Safe Fish Catching', price: 34.00, rating: 5 },
  //   { id: 9, image: 'assets/images/product/9.png', name: 'Fishing Retractable', price: 115.00, rating: 5 }
  // ]
console.log(product);

  return (
    <div className="row">
      {product.map(product => (
        <div key={product.id} className="col-lg-4 col-md-6">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid