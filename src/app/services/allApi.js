import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//login
export const loginApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

//sign up
export const registerApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/sign-up`,reqBody,"")
}
//all product

export const getAllProduct = async (page = 1, category, brand, reqHeader) => {
    let url = `${serverUrl}/get-all-products?page=${page}&limit=10`;
      console.log(category,brand);
      
    // Append category and brand only if both exist
    if (category && brand) {
        url += `&category_id=${category}&brand=${encodeURIComponent(brand)}`;
    } else {
        // Append category only if it's valid
        if (category) {
            url += `&category_id=${category}`;
        }

        // Append brand only if it's valid
        if (brand) {
            url += `&brand=${encodeURIComponent(brand)}`;
        }
    }

    console.log("API Request URL:", url);

    return await commonApi('GET', url, "", reqHeader);
};

//add-review
export const addReviewApi =async(reqBody,reqHeader)=>{
    console.log(reqBody);
    
    return await commonApi('POST',`${serverUrl}/add-review`,reqBody,reqHeader)
}



//get -single -product

export const getSignleProduct=async(id,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/single-product/${id}`,"",reqHeader)
}
//get - price -of - single - product
export const getPriceDetailsApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/get-product-price`,reqBody,"")
}


//get-profile-details

export const getProfileApi =async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/get-user`,"",reqHeader)
}

//logout

export const logoutApi =async(reqHeader)=>{
     return await commonApi('POST',`${serverUrl}/logout`,"",reqHeader)
}

//add to cart

export const addToCartApi =async(reqBody,reqHeader)=>{
    console.log(reqBody);
    
    return await commonApi('POST',`${serverUrl}/add-to-cart`,reqBody,reqHeader)
}
//view cart items

export const getCartApi =async(reqBody,reqHeader)=>{
    console.log(reqBody);
    
    return await commonApi('POST',`${serverUrl}/fetch-cart`,reqBody,reqHeader)
}

//remove cart

export const deleteCartApi =async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/remove-cart-items`,reqBody,reqHeader)
}

//update cart item

export const updateCartApi =async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/update-cart`,reqBody,reqHeader)
}

//all category

export const allCategoryApi =async()=>{
    return await commonApi('GET',`${serverUrl}/get-all-categories`,"","")
}

// new products category

export const newCategoryApi =async()=>{
    return await commonApi('GET',`${serverUrl}/get-four-categories`,"","")
}


//shop by category

export const shopByCategoyApi =async()=>{
    return await commonApi('GET',`${serverUrl}/shop-by-category`,"","")
}

//featured product

export const featuredProductApi =async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/featured-products`,"",reqHeader)
}

//Search api

export const searchProductApi =async(search)=>{
    return await commonApi('GET',`${serverUrl}/search-products?search=${search}`,"","")
}

//add address api

export const addAddressApi =async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-address`,reqBody,reqHeader)
}

// get address api
export const getAlladdressApi =async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/get-address`,"",reqHeader)
}

// delete address api

export const DeleteAddressApi =async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/delete-address`,reqBody,reqHeader)
}

//update address api

export const updateAddressApi =async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/update-address`,reqBody,reqHeader)
}

// update profile
export const updateProfileApi =async(reqBody,reqHeader)=>{
    
    return await commonApi('POST',`${serverUrl}/update-profile`,reqBody,reqHeader)
}

//fogot password api
export const sendEmailApi =async(reqBody)=>{
    
    return await commonApi('POST',`${serverUrl}/forgot-password`,reqBody,"")
    
}

//rest password

export const resetPasswordApi =async(reqBody)=>{
    
    return await commonApi('POST',`${serverUrl}/reset-password`,reqBody,"")
    
}

//place order id

export const placeOrderApi =async(reqBody,reqHeader)=>{
    
    return await commonApi('POST',`${serverUrl}/place-order`,reqBody,reqHeader)
    
}
//payment response
export const paymentResponseApi =async(reqBody,reqHeader)=>{
    
    return await commonApi('POST',`${serverUrl}/verify-payment`,reqBody,reqHeader)
    
}
//orderDetails

export const orderDetailsApi =async(reqHeader)=>{
    
    return await commonApi('GET',`${serverUrl}/order-history`,"",reqHeader)
    
}

//faq

export const faqApi =async()=>{
    return await commonApi('GET',`${serverUrl}/faq-list`,"","")
}

//contactUs
export const ContactApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/contact-store`,reqBody,"")
}

//banner image

export const imageApi =async()=>{
    return await commonApi('GET',`${serverUrl}/banner-list`,"","")
}

// new products categorywise (home)

export const NewproctApi =async(category)=>{
    return await commonApi('GET',`${serverUrl}/get-categorised-product/${category}`,"","")
}

// Hot product(home)

export const HotproductApi =async()=>{
    return await commonApi('GET',`${serverUrl}/trending-products`,"","")
}



























