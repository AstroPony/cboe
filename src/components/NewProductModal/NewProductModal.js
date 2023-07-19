import React, {useState} from 'react';
import ProductInput from '../ProductInput';

const NewProductModal = ({isOpen, onClose, handleNewProduct}) => {
    const [newProduct, setNewProduct] = useState({
        productId: '',
        productGroup: '',
        name: '',
        alias: '',
        productType: '',
        category: '',
        currency: '',
        priceId: '',
        priceConversionFactor: '',
        author: '',
        approvedBy: '',
        status: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSave = () => {
        handleNewProduct(newProduct);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="grid-row detail">
            <div className="grid-row inner">
                <span>New Product Detail</span>
            </div>
            <ProductInput
                label="Product ID"
                name="productId"
                value={newProduct.productId}
                onChange={handleChange}
            />
            <ProductInput
                label="Product Group"
                name="productGroup"
                value={newProduct.productGroup}
                onChange={handleChange}
            />
            <ProductInput
                label="Name"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
            />
            <ProductInput
                label="Alias"
                name="alias"
                value={newProduct.alias}
                onChange={handleChange}
            />
            <ProductInput
                label="Product Type"
                name="productType"
                value={newProduct.productType}
                onChange={handleChange}
            />
            <ProductInput
                label="Category"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
            />
            <ProductInput
                label="Currency"
                name="currency"
                value={newProduct.currency}
                onChange={handleChange}
            />
            <ProductInput
                label="Price ID"
                name="priceId"
                value={newProduct.priceId}
                onChange={handleChange}
            />
            <ProductInput
                label="Price Conversion Factor"
                name="priceConversionFactor"
                value={newProduct.priceConversionFactor}
                onChange={handleChange}
            />
            <ProductInput
                label="Author"
                name="author"
                value={newProduct.author}
                onChange={handleChange}
            />
            <ProductInput
                label="Approved By"
                name="approvedBy"
                value={newProduct.approvedBy}
                onChange={handleChange}
            />
            <ProductInput
                label="Status"
                name="status"
                value={newProduct.status}
                onChange={handleChange}
            />
            <div className="grid-item buttons">
                <button type="button" onClick={handleSave}>
                    Save
                </button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default NewProductModal;
