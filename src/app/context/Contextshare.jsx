'use client';
import React, { createContext, useState } from 'react'
export const deleteCartResponseContext =createContext({})
export const updateResponseContext =createContext({})
export const addResponseContext=createContext({})
export const updateAddressResponseContext=createContext({})


function Contextshare({children}) {
   const[deleteCartResponse,setDeleteCartResponse]=useState({})
  const[updateCartResponse,setUpdateCartResponse]=useState({})
  const[addCartResponse, setAddcartResponse]=useState({})
    const[updateAddressResponse, setUpdateAddressResponse]=useState({})


  return (
 <deleteCartResponseContext.Provider value={{deleteCartResponse,setDeleteCartResponse}}>  <updateResponseContext.Provider value={{updateCartResponse,setUpdateCartResponse}}><addResponseContext.Provider value={{addCartResponse,setAddcartResponse}}><updateAddressResponseContext.Provider value={{updateAddressResponse,setUpdateAddressResponse}}>{children}</updateAddressResponseContext.Provider></addResponseContext.Provider></updateResponseContext.Provider></deleteCartResponseContext.Provider>
  )
}

export default Contextshare