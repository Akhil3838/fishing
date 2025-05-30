'use client';
import { allCategoryApi } from '@/app/services/allApi';
import React, { useEffect, useState } from 'react';

const ShopSidebar = ({ 
  brands, 
  onCategoriesChange, 
  onBrandsChange,
  selectedCategories = [],
  selectedBrands = []
}) => {
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const result = await allCategoryApi();
      const data = result.data.data || [];
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoriesChange(newCategories);
  };

  const handleBrandChange = (brandName) => {
    const newBrands = selectedBrands.includes(brandName)
      ? selectedBrands.filter(b => b !== brandName)
      : [...selectedBrands, brandName];
    onBrandsChange(newBrands);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="shop-sidebar">
      {/* Search */}
      <aside className="widget widget-search">
        <form className="search-form" action="#" method="post">
          <input type="search" name="s" placeholder="Enter keyword" />
          <button type="submit" value="Search"><i className="nss-search"></i></button>
        </form>
      </aside>

      {/* Categories */}
      <aside className="widget">
        <h3 className="widget-title mt-3">Categories</h3>
        <ul className="category-list">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat.id} className="category-item" >
                <label className="category-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => handleCategoryChange(cat.id)}
                    className="category-checkbox"
                  />
                  <span className="category-name">{cat?.category_name}</span>
                </label>
              </li>
            ))
          ) : (
            <li></li>
          )}
        </ul>
      </aside>

      {/* Brands */}
      <aside className="widget">
        <h3 className="widget-title">Brands</h3>
        <ul className="category-list">
          {brands && brands.length > 0 ? (
            brands.map((b, index) => (
              <li key={index} className="category-item">
                <label className="category-label">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => handleBrandChange(b)}
                    className="category-checkbox"
                  />
                  <span className="category-name">{b}</span>
                </label>
              </li>
            ))
          ) : (
            <li></li>
          )}
        </ul>
      </aside>

      {/* Filter */}
      <aside className="widget">
        <h3 className="widget-title">Filter</h3>
        <div className="price_slider_wrapper">
          <form action="#" method="get" className="clearfix">
            <div id="slider-range"></div>
          </form>
        </div>
      </aside>

      {/* Best Sellers */}
      {/* <BestSellersWidget /> */}

      {/* Tags */}
      <aside className="widget">
        <h3 className="widget-title">Product tags</h3>
        <div className="tagcloud">
          <a href="#">Handle</a>
          <a href="#">Fishing</a>
          <a href="#">Reels</a>
          <a href="#">Nets</a>
          <a href="#">Safe</a>
        </div>
      </aside>
    </div>
  );
};

// const BestSellersWidget = () => {
//   return (
//     <aside className="widget">
//       <h3 className="widget-title">Best Sellers</h3>
//       <BestSellerItem 
//         image="assets/images/product/b1.png" 
//         name="Fishing Foldable" 
//         price={35.00} 
//       />
//       <BestSellerItem 
//         image="assets/images/product/b2.png" 
//         name="Net Fishing Nets" 
//         price={15.00} 
//       />
//       <BestSellerItem 
//         image="assets/images/product/b3.png" 
//         name="Telescoping Pole Handle" 
//         price={32.00} 
//       />
//     </aside>
//   );
// };

// const BestSellerItem = ({ image, name, price }) => {
//   return (
//     <div className="best-sale-item">
//       <img src={image} alt="product" />
//       <a href="single-product.html">{name}</a>
//       <div className="product_price clearfix">
//         <span className="price"><span><span>$</span>{price.toFixed(2)}</span></span>
//       </div>
//     </div>
//   );
// };

export default ShopSidebar;