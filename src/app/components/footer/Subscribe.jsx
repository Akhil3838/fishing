import { subscribeApi } from "@/app/services/allApi";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);

  try {
  const result = await subscribeApi(formData);
  console.log(result);

  if (result.status === 200 && result.data.status === true) {
    toast.success("Subscribe successful!", {
      position: "top-center",
      autoClose: 1000,
      theme: "colored",
    });
    setEmail("");
  } else {
    // handle validation error
    const errorMsg =
      result?.data?.message?.email?.[0] || "Something went wrong ❌";

    toast.error(errorMsg, {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });
  }
} catch (err) {
  console.log(err);

  toast.error("Server error ❌", {
    position: "top-center",
    autoClose: 2000,
    theme: "colored",
  });
}
  };

  return (
    <div className="col-lg-3 col-md-6">
      <aside className="widget widget_mc4wp_form_widget">
        <h3 className="widget-title">Subscribe</h3>

        <form className="mc4wp-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            name="EMAIL"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input type="submit" value="Subscribe" />
        </form>
      </aside>

      <p>
        Get the latest updates via email. Any time you may unsubscribe
      </p>
            <ToastContainer />
      
    </div>
  );
}

export default Newsletter;