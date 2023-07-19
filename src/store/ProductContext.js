
import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts, updateProduct, createProduct } from '../services/productService';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, []);

    const saveProduct = async (updatedProduct) => {
        try {

            const updatedProducts = [...products];


            const index = updatedProducts.findIndex((product) => product.productId === updatedProduct.productId);


            if (index !== -1) {
                updatedProducts[index] = updatedProduct;
            } else {

                updatedProducts.push(updatedProduct);
            }

            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error saving product details:', error);
        }
    };

    const filterProducts = (text) => {
        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(text.toLowerCase()) || product.productId.toLowerCase().includes(text.toLowerCase())
        );
    };

    const createNewProduct = async (newProduct) => {
        try {
            const createdProduct = await createProduct(newProduct);
            setProducts((prevProducts) => [...prevProducts, createdProduct]);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };


    return (
        <ProductContext.Provider value={{ products, saveProduct, createNewProduct, filterProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };
