// "use client"
// import React, { useEffect, useState, Suspense } from 'react'
// // import ShopSidebar from '../components/shop/ShopSidebar'
// // import ShopProducts from '../components/shop/ShopProducts'
// // import { getAllProduct } from '../services/allApi'
// import { toast } from 'react-toastify'
// import { useSearchParams } from 'next/navigation';
// import Footer from '@/app/components/Footer'
// import Header from '@/app/components/Header'
// import ShopSidebar from '@/app/components/shop/ShopSidebar';
// import ShopProducts from '@/app/components/shop/ShopProducts';

// function ShoppingContent() {
//   const [products, setProducts] = useState([])
//   const [brands, setBrand] = useState([])
//   const [totalPages, setTotalPages] = useState(1)
//   const [page, setPage] = useState(1)
//   const [selectedCategories, setSelectedCategories] = useState([])
//   const [selectedBrands, setSelectedBrands] = useState([])
//   const searchParams = useSearchParams();
//   const slug = searchParams.get('slug');
//   console.log(slug);

//   const allProducts = async (page, categories, brands) => {
//     const token = sessionStorage.getItem("token")

//     console.log("Fetching products with:", { categories, brands })

//     const reqHeader = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     }

//     try {
//       const result = await getAllProduct(
//         page, 
//         categories.join(','), 
//         brands.join(','), 
//         reqHeader
//       )
//       console.log("Fetched Products:", result)

//       setProducts(result.data.products)
//       setBrand(result.data.brands)
//       const totalCount = result.data.total || 0
//       const perPage = result.data.per_page || 1
//       setTotalPages(Math.ceil(totalCount / perPage) || 1)
//     } catch (error) {
//       console.error("Error fetching products:", error)
//       toast.error("Error fetching products")
//     }
//   }

//   useEffect(() => {
//     setPage(1)
//   }, [selectedCategories, selectedBrands])

//   console.log(selectedCategories);

//   useEffect(() => {
//     allProducts(page, selectedCategories, selectedBrands)
//   }, [page, selectedCategories, selectedBrands])

//   return (
//     <>
//       <Header />
//       <section className="shoppage-setion" style={{paddingTop:'160px'}}>
//         <section className="breadcrumb-section py-2">
//           <div className="container">
//             <div className="d-flex justify-content-between align-items-center">
//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0">
//                   <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
//                   <li className="breadcrumb-item active" aria-current="page">Shop</li>
//                   <li className="breadcrumb-item active" aria-current="page">{slug}</li>
//                 </ol>
//               </nav>
//             </div>
//           </div>
//         </section>

//         <div className="container">
//           <div className="row">
//             <div className="col-lg-3 col-md-6">
//               <ShopSidebar
//                 brands={brands} 
//                 onCategoriesChange={setSelectedCategories}
//                 onBrandsChange={setSelectedBrands}
//                 selectedCategories={selectedCategories}
//                 selectedBrands={selectedBrands}
//               />
//             </div>
//             <div className="col-lg-9 col-md-12">
//               <ShopProducts
//                 products={products} 
//                 totalPages={totalPages} 
//                 currentPage={page} 
//                 onPageChange={setPage}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   )
// }

// function Shopping() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ShoppingContent />
//     </Suspense>
//   )
// }

// export default Shopping