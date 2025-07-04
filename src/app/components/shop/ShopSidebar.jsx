'use client';
import { allCategoryApi, displayVarientApi } from '@/app/services/allApi';
import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ShopSidebar = ({
  brands,
  onCategoriesChange,
  onBrandsChange,
  selectedCategories = [],
  selectedBrands = [],
  onVariantsChange,
  onPriceChange,
  slug
}) => {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [variants, setVariants] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(4);
  const [visibleOptions, setVisibleOptions] = useState({}); // Track visible options per variant

  const getCategory = async () => {
    try {
      const result = await allCategoryApi();
      const data = result.data.data || [];
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const getVarient = async () => {
    try {
      const result = await displayVarientApi({ category_slug: slug });
      setVariants(result.data.variants || []);
      
      // Initialize visible options for each variant
      const initialVisibility = {};
      result.data.variants?.forEach(variant => {
        initialVisibility[variant.attribute_name] = 4;
      });
      setVisibleOptions(initialVisibility);
    } catch (error) {
      console.error("Failed to fetch variants", error);
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

  const handleVariantChange = (attribute, option) => {
    setSelectedVariants(prev => {
      const currentOptions = prev[attribute] || [];
      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter(o => o !== option)
        : [...currentOptions, option];

      return { ...prev, [attribute]: updatedOptions };
    });
  };

  const toggleVariantOptions = (attribute) => {
    setVisibleOptions(prev => ({
      ...prev,
      [attribute]: prev[attribute] === 4 ? variants.find(v => v.attribute_name === attribute)?.options.length || 4 : 4
    }));
  };

  useEffect(() => {
    if (onVariantsChange) {
      const variant_attribute = Object.keys(selectedVariants).filter(attr => selectedVariants[attr].length > 0);
      const variant_option = variant_attribute.flatMap(attr => selectedVariants[attr]);

      onVariantsChange({
        variant_attribute,
        variant_option
      });
    }
  }, [selectedVariants]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    if (onPriceChange) {
      onPriceChange(newValue);
    }
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(value);
  };

  useEffect(() => {
    getCategory();
    getVarient();
  }, []);

  return (
    <div className="shop-sidebar">
      {/* Price Range Filter */}
      <aside className="widget">
        <h3 className="widget-title">Price Range (₹)</h3>
        <Box sx={{ width: '95%', padding: '0 10px', margin: '0 auto' }}>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={20000}
            step={500}
            valueLabelFormat={formatPrice}
            sx={{
              color: '#0d6efd',
              height: 6,
              '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
                backgroundColor: '#fff',
                border: '2px solid #0d6efd',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 4px rgba(13, 110, 253, 0.2)',
                },
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#0d6efd',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '0.75rem',
                top: '-30px',
                '&:before': {
                  display: 'none'
                }
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between',  mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Min: ₹{formatPrice(priceRange[0])}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Max: ₹{formatPrice(priceRange[1])}
            </Typography>
          </Box>
        </Box>

      </aside>
                      <h3 className="widget-title"></h3>


      {/* Brands Widget */}
      <aside className="widget">
        <h3 className="widget-title">Brands</h3>
        <ul className="category-list">
          {brands && brands.length > 0 ? (
            <>
              {/* Show first 4 brands */}
              {brands.slice(0, visibleBrands).map((b, index) => (
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
              ))}
              
              {/* Show "See more" link if there are more brands */}
              {brands.length > 4 && (
                <li className="category-item">
                  <button 
                    onClick={() => setVisibleBrands(visibleBrands === 4 ? brands.length : 4)}
                    className="see-more-link"
                  >
                    {visibleBrands === 4 ? 'See more (+' + (brands.length - 4) + ')' : 'See less'}
                  </button>
                </li>
              )}
            </>
          ) : (
            <li>No brands found</li>
          )}
        </ul>
      </aside>

      {/* Dynamic Variant Filters */}
      {variants && variants.length > 0 && variants.map((variant, i) => {
        const currentVisible = visibleOptions[variant.attribute_name] || 4;
        const totalOptions = variant.options.length;
        
        return (
          <aside className="widget" key={i}>
            <h3 className="widget-title">{variant.attribute_name}</h3>
            <ul className="category-list">
              {/* Show limited options */}
              {variant.options.slice(0, currentVisible).map((option, j) => (
                <li key={j} className="category-item">
                  <label className="category-label">
                    <input
                      type="checkbox"
                      checked={(selectedVariants[variant.attribute_name] || []).includes(option)}
                      onChange={() =>
                        handleVariantChange(variant.attribute_name, option)
                      }
                      className="category-checkbox"
                    />
                    <span className="category-name">{option}</span>
                  </label>
                </li>
              ))}
              
              {/* Show "See more" link if there are more options */}
              {totalOptions > 4 && (
                <li className="category-item">
                  <button 
                    onClick={() => toggleVariantOptions(variant.attribute_name)}
                    className="see-more-link"
                  >
                    {currentVisible === 4 
                      ? `See more (+${totalOptions - 4})` 
                      : 'See less'}
                  </button>
                </li>
              )}
            </ul>
          </aside>
        );
      })}
    </div>
  );
};

export default ShopSidebar;