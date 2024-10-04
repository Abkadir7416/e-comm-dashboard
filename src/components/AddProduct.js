import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const addProduct = async () => {
        // !name ---> it return true if field is empty otherwise return false if we provide any input value;
        if (!name || !price || !company || !category) {
            setError(true)
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:4000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);
        setName('')
        setCompany('')
        setCategory('')
        setPrice('')
        toast.success('Product added successfully!', {
            position: "top-center",
            autoClose: 3000,  // Auto-close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }

    return (
        <div className='login'>
            <h1>Add Product</h1>
            <input className='inputBox' type="text" placeholder='Enter Product Name' value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input className='inputBox' type="text" placeholder='Enter Product Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            <input className='inputBox' type="text" placeholder='Enter Product Category' value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            <input className='inputBox' type="text" placeholder='Enter Product Compay' value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}
            <button className='appButton' type="submit" onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;