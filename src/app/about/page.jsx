'use client';
import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { bannerApi } from '../services/allApi';

export default function About() {
  const [link, setLink] = useState([]);

  const handleLink = async () => {
    try {
      const res = await bannerApi();
      console.log(res.data.settings);
      setLink(res.data.settings);
    } catch (error) {
      console.error("Error fetching footer links:", error);
    }
  };

  useEffect(() => {
    handleLink();
  }, []);

  // helper function to get value by label
  const getValue = (label) => {
    const item = link.find((i) => i.label === label);
    return item ? item.value : "";
  };

  return (
    <>
      <Header />
      {/* About Start */}
      <section className="about-section-2 pad_top">
        <div className="container" style={{ paddingTop: '100px' }}>
          <div className="row">
            <div className="col-lg-7">
              <div className="ab-thumb">
                <img src="assets/images/about2.png" alt="about" />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="sub_title">
                About Us <span></span>
              </div>
              <h2 className="sec_titles">Welcome to SCALESS</h2>
              <p>{getValue("about_content")}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
