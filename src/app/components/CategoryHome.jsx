import React, { useEffect, useState } from 'react';
import { allCategoryApi } from '../services/allApi';

function CategoryHome() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await allCategoryApi();
        setCategory(result.data.data || []);
        console.log(result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategory();
  }, []);

  return (
    <>
      <div className="row container">
        <div className="col-lg-12">
          <div className="cate-wrapper p-5">
            {category.length > 0 ? (
              category.map((item) => (
                <div className="cate-item-icon text-center" key={item.id}>
                  <a href={`/shopping`} className='ct'>
                    <img src={item.icon} alt={item.category_name} style={{ width: "50px", height: "50px", objectFit: "contain" }} />
                  </a>
                  <a className="ct" href={`/shopping/${item._id}`}>{item.category_name}</a>
                </div>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryHome;
