"use client"
import React, { useEffect, useState, Suspense } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'

import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import ShopSidebar from '@/app/components/shop/ShopSidebar'
import ShopProducts from '@/app/components/shop/ShopProducts'
import { getAllProduct } from '@/app/services/allApi'

function ShoppingContent() {
  const [products, setProducts] = useState([])
  const [brands, setBrand] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [selectedBrands, setSelectedBrands] = useState([])

  const params = useParams()
  const { slug } = params

const allProducts = async (page, brands) => {
  const token = sessionStorage.getItem("token")

  console.log("Fetching products with:", { slug, brands })

  const reqHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }

  try {
    const result = await getAllProduct(
      page,
      slug,
      brands.join(','),
      reqHeader
    )

    console.log("Fetched Products:", result)

    setProducts(result.data.products)
    setBrand(result.data.brands)

    const totalPages = parseInt(result.data.last_page) || 1
    setTotalPages(totalPages)
  } catch (error) {
    console.error("Error fetching products:", error)
    toast.error("Error fetching products")
  }
}
  useEffect(() => {
    setPage(1)
  }, [slug, selectedBrands])
console.log(totalPages);

  useEffect(() => {
    allProducts(page, selectedBrands)
  }, [page, selectedBrands])

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
              />
            </div>
            <div className="col-lg-9 col-md-12">
              <ShopProducts
                products={products}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

function Shopping() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShoppingContent />
    </Suspense>
  )
}

export default Shopping
