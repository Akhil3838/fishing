"use client";
import React, { useContext, useEffect, useState } from "react";
// import Editaddress from ".../components/Editaddress";
// import Editprofile from ".../components/Editprofile";
import { getProfileApi } from "../services/allApi";
import Editprofile from "../components/profile/Editprofile";
import Editaddress from "../components/profile/Editaddress";
import Order from "../components/profile/Order";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import Order from ".../components/Order";

function Profile() {
  const [activeSection, setActiveSection] = useState("overview");
 const [user,setUser]=useState({})
//  const{updateUserResponse}=useContext(profileUpdateResponseContext)
 
  const getUser =async()=>{
    const token =sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
    }
    const result = await getProfileApi(reqHeader)
   setUser(result.data.data)

  }
  
//   const showSection = (section) => {
//     setActiveSection(section);
//   };
//     useEffect(() => {
//         getUser();
//     }, [updateUserResponse]);

// console.log(user);
  const showSection = (section) => {
    setActiveSection(section);
  };
    useEffect(() => {
        getUser();
    }, []);

console.log(user);


  return (
    <>
    <Header/>
      <div className="container" style={{paddingTop:'100px'}}>
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 order-md-1 order-2">
            <h4 className="fw-bold mb-3">Account</h4>
            <p className="mb-3">{user?.name}</p>
            <hr />
            <nav className="nav flex-column">
              <button className={`nav-link btn btn-0 ${activeSection === "overview" ? "active" : ""}`} onClick={() => showSection("overview")}>Overview</button>
              <button className={`nav-link btn btn-0 ${activeSection === "orders" ? "active" : ""}`} onClick={() => showSection("orders")}>Orders</button>
              <button className={`nav-link btn btn-0 ${activeSection === "profile" ? "active" : ""}`} onClick={() => showSection("profile")}>Profile</button>
              <button className={`nav-link btn btn-0 ${activeSection === "addresses" ? "active" : ""}`} onClick={() => showSection("addresses")}>Addresses</button>
              {/* <button className="nav-link text-danger" onClick={() => showSection("delete")}>Delete Account</button> */}
            </nav>
          </div>

          {/* Right Section */}
          <div className="col-md-9 order-md-2 order-1">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="profile-container">
                <h5 className="fw-bold mb-4">Overview</h5>
                <hr />
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="overview-card" onClick={() => showSection("orders")}>
                      <i className="bi bi-box"></i>
                      <h6>Orders</h6>
                      <p>Check your order status</p>
                    </div>
                  </div>
                  {/* <div className="col-md-4 mb-3">
                    <div className="overview-card" onClick={() => showSection("wishlist")}>
                      <i className="bi bi-cart"></i>
                      <h6>Cartlist</h6>
                      <p>View your saved items</p>
                    </div>
                  </div> */}
                  <div className="col-md-4 mb-3">
                    <div className="overview-card" onClick={() => showSection("addresses")}>
                      <i className="bi bi-geo-alt"></i>
                      <h6>Addresses</h6>
                      <p>Manage your saved addresses</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="overview-card" onClick={() => showSection("profile")}>
                      <i className="bi bi-person"></i>
                      <h6>Edit Profile</h6>
                      <p>Update your personal details</p>
                    </div>
                  </div>
                  {/* <div className="col-md-4 mb-3">
                    <div className="overview-card text-danger" onClick={() => showSection("delete")}>
                      <i className="bi bi-trash"></i>
                      <h6>Delete Account</h6>
                      <p>Remove your account permanently</p>
                    </div>
                  </div> */}
                </div>
              </div>
            )}

            {/* Profile Details Section */}
            {activeSection === "profile" && (
                <Editprofile user={user}/>
            )}

            {/* Addresses Section */}
            {activeSection === "addresses" && (
                <Editaddress/>
            )}
             {activeSection === "orders" && (
                <Order/>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Profile;
