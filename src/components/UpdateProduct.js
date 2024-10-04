import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    },[])
    const getProductDetails = async() => {
        let result = await fetch(`http://localhost:4000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async() =>{
        let result = await fetch(`http://localhost:4000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn('result ', result)
        navigate('/')
    }

    return (
        <div className='login'>
            <h1>Update Product</h1>
            <input className='inputBox' type="text" placeholder='Enter Product Name' value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input className='inputBox' type="text" placeholder='Enter Product Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            <input className='inputBox' type="text" placeholder='Enter Product Category' value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            <input className='inputBox' type="text" placeholder='Enter Product Compay' value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}
            <button className='appButton' type="submit" onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;