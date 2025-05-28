import { updateProfileApi } from '@/app/services/allApi';
import React, { useContext, useState } from 'react';
// import { updateProfileApi } from '../services/allApi';
// import { profileUpdateResponseContext } from '../context/Contextshare';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Editprofile({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.customer?.address || '',
    city: user?.customer?.city || '',
    pincode: user?.customer?.pincode || '',
    state: user?.customer?.state || '',
    country: user?.customer?.country || '',
    gender: user?.customer?.gender || '',
  });
// const {setUpdateUserResponse}=useContext(profileUpdateResponseContext)
  // Handle input change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle save changes (You can modify this function to update data in your backend)
  const handleSave = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const result=await updateProfileApi(editData,reqHeader)
      console.log(result);
      if (result.status === 200) {
              toast.success("Address updated successfully!", { position: "top-center", autoClose: 1000, theme: "colored" });
             
            } else {
              toast.error("Failed to update", { position: "top-center", autoClose: 1000, theme: "colored" });
            }
    //   setUpdateUserResponse(result.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    console.log('Updated Data:', editData);
    setShowModal(false);
  };

  return (
    <>
      <div className="profile-container">
        <h5 className="fw-bold mb-4">Profile Details</h5>
        <hr />
        <div className="row mb-3">
          <div className="col-md-6"><strong>Full Name</strong></div>
          <div className="col-md-6">{user?.name || '- not added -'}</div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>Mobile Number</strong></div>
          <div className="col-md-6">{user?.phone || '- not added -'}</div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>Address</strong></div>
          <div className="col-md-6 text-muted">{user?.customer?.address || '- not added -'}</div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>City</strong></div>
          <div className="col-md-6 text-muted">{user?.customer?.city || '- not added -'}</div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>Pincode</strong></div>
          <div className="col-md-6 text-muted">{user?.customer?.pincode || '- not added -'}</div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>State</strong></div>
          <div className="col-md-6 text-muted">{user?.customer?.state || '- not added -'}</div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>Country</strong></div>
          <div className="col-md-6 text-muted">{user?.customer?.country || '- not added -'}</div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><strong>Gender</strong></div>
          <div className="col-md-6 text-muted">{user?.customer?.gender || '- not added -'}</div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>EDIT</button>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" value={editData.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" name="phone" value={editData.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={editData.address} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" name="city" value={editData.city} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Pincode</label>
                    <input type="text" className="form-control" name="pincode" value={editData.pincode} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="state" value={editData.state} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" name="country" value={editData.country} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" name="gender" value={editData.gender} onChange={handleChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for the modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
      <ToastContainer />

    </>
  );
}

export default Editprofile;
