import { orderDetailsApi } from "@/app/services/allApi";
import React, { useEffect, useState } from "react";
// import { orderDetailsApi } from "../services/allApi";

function Order() {
  const [orders, setOrders] = useState([]);
  const [openOrderIndex, setOpenOrderIndex] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await orderDetailsApi(reqHeader);
        console.log(response);
        
        if (response.status === 200) {
          setOrders(response.data.orderHistory);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (index) => {
    setOpenOrderIndex(openOrderIndex === index ? null : index);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-dark fw-bold mb-4">📦 Order History</h2>

      {orders.length === 0 ? (
        <h4 className="text-center text-danger mt-5">No Orders Found</h4>
      ) : (
        orders.map((order, index) => (
          <div key={order.id} className="card shadow-sm p-4 mb-4 order-card">
            <div className="row align-items-center">
              {/* Left Side - Order Details */}
              <div className="col-md-6">
                <h5 className="fw-bold text-primary">Order #{index + 1}</h5>
                <p><strong>Order No:</strong> {order.order_no}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p>
                  <strong>Total Amount:</strong> 
                  <span className="text-success fw-bold"> ₹{order.total_amount}</span>
                </p>
                <p>
                  <strong>Order Status:</strong>
                  <span className={`badge ms-2 ${order.status === "pending" ? "bg-warning text-dark" : "bg-success"}`}>
                    {order.status}
                  </span>
                </p>
                <p>
                  <strong>Delivery Status:</strong>
                  <span className="badge bg-info text-dark ms-2">{order.delivery_status}</span>
                </p>

                {/* View Products Button */}
                <button
                  className="btn btn-outline-primary mt-3"
                  onClick={() => toggleOrderDetails(index)}
                >
                  {openOrderIndex === index ? "Hide Products" : "View Products"}
                </button>
              </div>

              {/* Right Side - Product Details */}
              {openOrderIndex === index && (
                <div className="col-md-6">
                  <div className="products-container p-3">
                    <h6 className="text-primary fw-bold">🛍 Ordered Products</h6>
                    <hr />
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="product-item d-flex align-items-center p-2 mb-2">
                        {/* Product Image */}
                        <img
                          src={item.thumbnail}
                          alt={item.product_name}
                          className="rounded"
                          style={{ width: "50px", height: "50px", objectFit: "cover", border: "1px solid #ddd" }}
                        />
                        {/* Product Details */}
                        <div className="ms-3">
                          <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "14px" }}>{item.product_name}</h6>
                          <p className="mb-0 text-muted" style={{ fontSize: "12px" }}><strong>Qty:</strong> {item.qty}</p>
                          <p className="fw-bold text-success mb-0" style={{ fontSize: "14px" }}>₹{item.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Order;
