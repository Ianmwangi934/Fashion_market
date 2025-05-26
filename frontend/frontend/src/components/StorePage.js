import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';


const StorePage = () => {
    const [products, setProducts] = useState([]); // All products from backend
    const [searchTerm, setSearchTerm] = useState("");  // Search input
    const [filteredProducts, setFilteredProducts] = useState([]) //Displayed

    // Fetching all products at once
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/store/api/products/',{
                
                params: {
                    t: new Date().getTime(),
                },
            });
            console.log("Fetched products:", response.data);
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter whenever searchTerm or products change
    useEffect(()=>{
        const filtered = products.filter(product=>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    return (
        <div>
            {/* ProductForm with refreshed products passed in */}
            
            
            {/* Search Bar */}
            <input 
                type="text"
                placeholder = "search products ..."
                value = {searchTerm}
                onChange = {(e)=>setSearchTerm(e.target.value)}
                style={{
                    padding: "10px",
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                  }}
            />
            
            <ProductList products={filteredProducts} />
        </div>
    );
};

export default StorePage;
