'use client';
import React, { useState, useEffect } from "react";
import {
  addAddressApi,
  DeleteAddressApi,
  getAlladdressApi,
  updateAddressApi
} from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SelectAddress({ onSelectAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });
  const [token, setToken] = useState(null);

  /* ------------------ GET TOKEN ------------------ */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  /* ------------------ FETCH ADDRESSES ------------------ */
  useEffect(() => {
    if (token) fetchAddresses();
  }, [token]);

  const fetchAddresses = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const response = await getAlladdressApi(reqHeader);

      if (response.status === 200) {
        const list = response.data.addressList || [];
        setAddresses(list);

        if (list.length > 0) {
          setSelectedAddress(list[0].id);
          onSelectAddress(list[0].id);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch addresses", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  /* ------------------ FORM HANDLERS ------------------ */
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
        toast.success(
          isEditing ? "Address updated successfully!" : "Address saved successfully!",
          { position: "top-center", autoClose: 1000, theme: "colored" }
        );

        setFormData({
          id: "",
          name: "",
          phone: "",
          address: "",
          city: "",
          pincode: "",
          state: "",
          country: "",
        });

        fetchAddresses();

        const modal = bootstrap.Modal.getInstance(
          document.getElementById("addressModal")
        );
        modal?.hide();
      } else {
        toast.error("Please fill all fields", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      }
    } catch {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  /* ------------------ EDIT ADDRESS ------------------ */
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

  /* ------------------ DELETE ADDRESS ------------------ */
  const removeAddress = async (id) => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const fd = new FormData();
      fd.append("address_id", id);

      const result = await DeleteAddressApi(fd, reqHeader);

      if (result.status === 200) {
        toast.success("Address deleted successfully!", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
        fetchAddresses();
      }
    } catch {
      toast.error("Failed to delete address", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  /* ------------------ SELECT ADDRESS ------------------ */
  const handleAddressSelection = (id) => {
    setSelectedAddress(id);
    onSelectAddress(id);
  };

  return (
    <>
      <div>
        <h4 className="fw-bold mb-3">Select Delivery Address</h4>

        {/* ADDRESS LIST */}
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address.id} className="mb-3 p-3 border rounded">
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  checked={selectedAddress === address.id}
                  onChange={() => handleAddressSelection(address.id)}
                  className="me-2"
                />
                <h6 className="fw-bold mb-0">
                  {address.name}
                  <span className="badge bg-success ms-2">HOME</span>
                </h6>
              </div>

              <p className="mb-1">{address.address}</p>
              <p className="fw-bold mb-2">Mobile: {address.phone_number}</p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => handleEdit(address)}
                >
                  EDIT
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeAddress(address.id)}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No address found</p>
        )}

        {/* ADD ADDRESS (ONLY WHEN EMPTY) */}
        {addresses.length === 0 && (
          <div
            className="mt-3 p-3 border rounded text-danger text-center"
            role="button"
            onClick={() => {
              setFormData({
                id: "",
                name: "",
                phone: "",
                address: "",
                city: "",
                pincode: "",
                state: "",
                country: "",
              });
              setIsEditing(false);
              new bootstrap.Modal(document.getElementById("addressModal")).show();
            }}
          >
            <strong>+ Add New Address</strong>
          </div>
        )}
      </div>

      {/* MODAL */}
      <div className="modal fade" id="addressModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content p-3 rounded">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                {isEditing ? "Edit Address" : "Add New Address"}
              </h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {["name", "phone", "address", "city", "pincode", "state", "country"].map(
                (field) => (
                  <div className="mb-3" key={field}>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="form-control rounded-pill"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  </div>
                )
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline-secondary rounded-pill"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-success rounded-pill fw-bold"
                onClick={handleSubmit}
              >
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
