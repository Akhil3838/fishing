'use client';
import React, { useState, useEffect } from "react";
import { addAddressApi, DeleteAddressApi, getAlladdressApi, updateAddressApi } from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SelectAddress({ onSelectAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "", name: "", phone: "", address: "", city: "", pincode: "", state: "", country: "",
  });
  const [token, setToken] = useState(null); // ✅ state to hold token

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchAddresses();
    }
  }, [token]);

  const fetchAddresses = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await getAlladdressApi(reqHeader);

      if (response.status === 200) {
        setAddresses(response.data.addressList);
        if (response.data.addressList.length > 0) {
          const firstAddressId = response.data.addressList[0].id;
          setSelectedAddress(firstAddressId);
          onSelectAddress(firstAddressId);
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to fetch addresses", { position: "top-center", autoClose: 1000, theme: "colored" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      let requestData = { ...formData };

      if (isEditing) requestData.address_id = formData.id;

      const response = isEditing
        ? await updateAddressApi(requestData, reqHeader)
        : await addAddressApi(requestData, reqHeader);

      if (response.status === 200) {
        toast.success(isEditing ? "Address updated successfully!" : "Address saved successfully!", {
          position: "top-center", autoClose: 1000, theme: "colored",
        });
        setFormData({ id: "", name: "", phone: "", address: "", city: "", pincode: "", state: "", country: "" });
        fetchAddresses();
        const modal = bootstrap.Modal.getInstance(document.getElementById("addressModal"));
        if (modal) modal.hide();
      } else {
        toast.error("Please fill the form completely", { position: "top-center", autoClose: 1000, theme: "colored" });
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Something went wrong!", { position: "top-center", autoClose: 1000, theme: "colored" });
    }
  };

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
    new bootstrap.Modal(document.getElementById("addressModal")).show();
  };

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

  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
    onSelectAddress(addressId);
  };

  return (
    <>
      <div>
        <h4 className="fw-bold">Select Delivery Address</h4>
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === address.id}
                  onChange={() => handleAddressSelection(address.id)}
                  className="me-2"
                />
                <h6 className="fw-bold mb-0">
                  {address.name} <span className="badge bg-success ms-2">HOME</span>
                </h6>
              </div>
              <p className="mb-1">{address.address}</p>
              <p className="fw-bold mb-1">Mobile: {address.phone_number}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-dark btn-sm" onClick={() => handleEdit(address)}>EDIT</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => removeAddress(address.id)}>REMOVE</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No addresses found. Add a new one below.</p>
        )}

        <div className="mt-3 p-3 border rounded text-danger text-center" role="button" onClick={() => {
          setFormData({ id: "", name: "", phone: "", address: "", city: "", pincode: "", state: "", country: "" });
          setIsEditing(false);
          new bootstrap.Modal(document.getElementById("addressModal")).show();
        }}>
          <span className="fw-bold">+ Add New Address</span>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="addressModal" tabIndex="-1" aria-labelledby="addressModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content p-3 rounded">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="addressModalLabel">{isEditing ? "Edit Address" : "Add New Address"}</h5>
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

export default SelectAddress;
