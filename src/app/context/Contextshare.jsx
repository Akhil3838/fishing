'use client';
import React, { createContext, useState } from 'react'
export const deleteCartResponseContext =createContext({})
export const updateResponseContext =createContext({})
export const addResponseContext=createContext({})


function Contextshare({children}) {
   const[deleteCartResponse,setDeleteCartResponse]=useState({})
  const[updateCartResponse,setUpdateCartResponse]=useState({})
  const[addCartResponse, setAddcartResponse]=useState({})

  return (
 <deleteCartResponseContext.Provider value={{deleteCartResponse,setDeleteCartResponse}}>  <updateResponseContext.Provider value={{updateCartResponse,setUpdateCartResponse}}><addResponseContext.Provider value={{addCartResponse,setAddcartResponse}}>{children}</addResponseContext.Provider></updateResponseContext.Provider></deleteCartResponseContext.Provider>
  )
}

export default Contextshare