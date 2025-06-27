"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import ShopSidebar from '@/app/components/shop/ShopSidebar';
import ShopProducts from '@/app/components/shop/ShopProducts';
import { getAllProduct } from '@/app/services/allApi';

function ShoppingContent() {
  const [products, setProducts] = useState([]);
  const [brands, setBrand] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [sortValue, setSortValue] = useState("newtoOld");
  const [variantSelections, setVariantSelections] = useState({
    variant_attribute: [],
    variant_option: [],
  });

  const params = useParams();
  const { slug } = params;

  const allProducts = async (
    page,
    brands,
    minPrice = 0,
    maxPrice = 10000,
    sortValue = "newtoOld",
    variants = { variant_attribute: [], variant_option: [] }
  ) => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getAllProduct(
        page,
        slug,
        brands.join(','),
        minPrice,
        maxPrice,
        sortValue,
        variants,
        reqHeader
      );

      setProducts(result.data.products);
      setBrand(result.data.brands);
      setTotalPages(parseInt(result.data.last_page) || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products");
    }
  };

  const handleVariantsChange = (selections) => {
    console.log('Selected Variant Options:', selections);
    setVariantSelections(selections);
  };

  useEffect(() => {
    setPage(1); // Reset to first page on filter change
  }, [slug, selectedBrands, priceRange, sortValue, variantSelections]);

  useEffect(() => {
    allProducts(page, selectedBrands, priceRange[0], priceRange[1], sortValue, variantSelections);
  }, [page, selectedBrands, priceRange, sortValue, variantSelections]);

  return (
    <>
      <Header />
      <section className="shoppage-setion" style={{ paddingTop: '160px' }}>
        <section className="breadcrumb-section py-2">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-decoration-none">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">Shop</li>
                  <li className="breadcrumb-item active" aria-current="page">{slug}</li>
                </ol>
              </nav>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <ShopSidebar
                brands={brands}
                onBrandsChange={setSelectedBrands}
                selectedBrands={selectedBrands}
                onPriceChange={setPriceRange}
                slug={slug}
                onVariantsChange={handleVariantsChange}
              />
            </div>
            <div className="col-lg-9 col-md-12">
              <ShopProducts
                products={products}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
                onSortChange={setSortValue}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function Shopping() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShoppingContent />
    </Suspense>
  );
}

export default Shopping;
