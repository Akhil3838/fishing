import { addAddressApi, DeleteAddressApi, getAlladdressApi, updateAddressApi } from "@/app/services/allApi";
import React, { useState, useEffect } from "react";
// import { addAddressApi, DeleteAddressApi, getAlladdressApi, updateAddressApi } from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Editaddress() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    address_id:""
  });

  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track if updating or adding new
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Fetch saved addresses
  const fetchAddresses = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await getAlladdressApi(reqHeader);

      if (response.status === 200) {
        setAddresses(response.data.addressList);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to fetch addresses", { position: "top-center", autoClose: 1000, theme: "colored" });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add or Update Address
  const handleSubmit = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
  
      let requestData = { ...formData };
  
      if (isEditing) {
        // Ensure address_id is included when updating
        requestData.address_id = formData.id;
      }
  
      let response;
      if (isEditing) {
        response = await updateAddressApi(requestData, reqHeader);
      } else {
        response = await addAddressApi(requestData, reqHeader);
      }
  
      if (response.status === 200) {
        toast.success(isEditing ? "Address updated successfully!" : "Address saved successfully!", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
  
        setFormData({ id: "", name: "", phone: "", address: "", city: "", pincode: "", state: "", country: "" });
        fetchAddresses();
  
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("addAddressModal"));
        if (modal) modal.hide();
      } else {
        toast.error("Please fill the form completely", { position: "top-center", autoClose: 1000, theme: "colored" });
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Something went wrong!", { position: "top-center", autoClose: 1000, theme: "colored" });
    }
  };
  
  
  // Handle Edit Button Click
  const handleEdit = (address) => {
    setFormData({
      id: address.id,
      name: address.name,
      phone: address.phone_number,
      address: address.address,
      city: address.city,
      pincode: address.pincode,
      state: address.state,
      country: address.country,
    });

    setIsEditing(true);

    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById("addAddressModal"));
    modal.show();
  };

  // Handle address deletion
  const removeAddress = async (id) => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };

      const formData = new FormData();
      formData.append("address_id", id);

      const result = await DeleteAddressApi(formData, reqHeader);

      if (result.status === 200) {
        toast.success("Address deleted successfully!", { position: "top-center", autoClose: 1000, theme: "colored" });
        fetchAddresses();
      } else {
        toast.error("Failed to delete address", { position: "top-center", autoClose: 1000, theme: "colored" });
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Something went wrong!", { position: "top-center", autoClose: 1000, theme: "colored" });
    }
  };

  return (
    <>
      <div className="profile-container">
        <h5 className="fw-bold mb-4">Saved Addresses</h5>
        <hr />
        <div className="row">
          {addresses.length > 0 ? (
            addresses.map((address, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="address-card p-3 shadow-sm rounded position-relative">
                  {/* Icons for Edit and Delete */}
                  <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
                    <button className="btn btn-sm text-primary border-0" onClick={() => handleEdit(address)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm text-danger border-0" onClick={() => removeAddress(address.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <h6 className="fw-bold">{address.name}</h6>
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p>No addresses found. Add a new one below.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-success px-4 py-2 rounded-pill fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#addAddressModal"
            onClick={() => {
              setFormData({ id: "", name: "", phone: "", address: "", city: "", pincode: "", state: "", country: "" });
              setIsEditing(false);
            }}
          >
            + Add New Address
          </button>
        </div>
      </div>

      {/* Bootstrap Modal for Adding/Editing Address */}
      <div className="modal fade" id="addAddressModal" tabIndex="-1" aria-labelledby="addAddressModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content p-3 rounded">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="addAddressModalLabel">{isEditing ? "Edit Address" : "Add New Address"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                {["name", "phone", "address", "city", "pincode", "state", "country"].map((field, index) => (
                  <div className="mb-3" key={index}>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="form-control rounded-pill p-2"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  </div>
                ))}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary px-3 rounded-pill" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-success px-4 rounded-pill fw-bold" onClick={handleSubmit}>
                {isEditing ? "Update Address" : "Save Address"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Editaddress;
