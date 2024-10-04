import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    // console.log("elljflk");
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:4000/products");
    result = await result.json();
    setProduct(result);
    // console.log("hello");
  };
//   console.warn("products2  ", products);

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:4000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
    //   console.log("deleted", result);
      getProducts();
    }
  };

  const searchHandle = async (event) => {
      let key = event.target.value;
    //   console.log('key ', key);
    if (key) {
      let result = await fetch(`http://localhost:4000/search/${key}`);
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Delete</li>
        <li>Update</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>delete</button>
            </li>
            <li>
              <button>
                <Link to={"/update/" + item._id}>update</Link>
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Product Found</h1>
      )}
    </div>
  );
};

export default ProductList;
