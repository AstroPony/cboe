import React, { useState, useEffect, useContext } from 'react';
import ProductInput from '../ProductInput';
import { ProductContext } from '../../store/ProductContext';

const ProductDetail = ({ product, onCancel, handleProductUpdate }) => {
    const { saveProduct } = useContext(ProductContext);
    const [editedProduct, setEditedProduct] = useState({});

    useEffect(() => {
        setEditedProduct(product);
    }, [product]);

    const handleSave = () => {
        const updatedProduct = { ...editedProduct };

        // Save the updated product using the saveProduct function from the context
        saveProduct(updatedProduct);

        // Pass the updated product back to the parent component (Overview)
        handleProductUpdate(updatedProduct);

        onCancel();
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    if (!editedProduct.productId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid-row detail">
            <div className="grid-row inner">
                <span>Product Detail - Editable</span>
            </div>
            <ProductInput
                label="Product ID"
                name="productId"
                value={editedProduct.productId}
                onChange={handleChange}
            />
            <ProductInput
                label="Product Group"
                name="productGroup"
                value={editedProduct.productGroup}
                onChange={handleChange}
            />
            <ProductInput
                label="Name"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
            />
            <ProductInput
                label="Alias"
                name="alias"
                value={editedProduct.alias}
                onChange={handleChange}
            />
            <ProductInput
                label="Product Type"
                name="productType"
                value={editedProduct.productType}
                onChange={handleChange}
            />
            <ProductInput
                label="Category"
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
            />
            <ProductInput
                label="Currency"
                name="currency"
                value={editedProduct.currency}
                onChange={handleChange}
            />
            <ProductInput
                label="Price ID"
                name="priceId"
                value={editedProduct.priceId}
                onChange={handleChange}
            />
            <ProductInput
                label="Price Conversion Factor"
                name="priceConversionFactor"
                value={editedProduct.priceConversionFactor}
                onChange={handleChange}
            />
            <ProductInput
                label="Author"
                name="author"
                value={editedProduct.author}
                onChange={handleChange}
            />
            <ProductInput
                label="Approved By"
                name="approvedBy"
                value={editedProduct.approvedBy}
                onChange={handleChange}
            />
            <ProductInput
                label="Status"
                name="status"
                value={editedProduct.status}
                onChange={handleChange}
            />
            <div className="grid-item buttons">
                <button type="button" onClick={handleSave}>
                    Save
                </button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
