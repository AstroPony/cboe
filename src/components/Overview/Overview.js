import React, {useEffect, useState} from 'react';
import {fetchProducts} from '../../services/productService';
import ProductDetail from '../ProductDetail';
import NewProductModal from '../NewProductModal';
import './Overview.scss';

const Overview = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

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

    useEffect(() => {
        const filteredProducts = products.filter(
            (product) =>
                product.name.toLowerCase().includes(filterText.toLowerCase()) ||
                product.productId.toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredProductList(filteredProducts);
    }, [filterText, products]);

    const handleSelectProduct = (productId) => {
        if (isEditing) {
            return;
        }

        setSelectedProductId(productId);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setSelectedProductId('');
        setIsEditing(false);
    };

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const handleProductUpdate = (updatedProduct) => {
        const updatedProducts = products.map((product) =>
            product.productId === updatedProduct.productId ? updatedProduct : product
        );
        setProducts(updatedProducts);

        const updatedFilteredProducts = filteredProductList.map((product) =>
            product.productId === updatedProduct.productId ? updatedProduct : product
        );
        setFilteredProductList(updatedFilteredProducts);
    };

    const addProductToProducts = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setFilteredProductList((prevFilteredProducts) => [...prevFilteredProducts, newProduct]);
    };

    return (
        <div className="container">
            <div className="grid-row">
                <div className="grid-item">
                    <h1>CBOE - Product Overview</h1>
                </div>
                <div className="grid-item searchContainer">
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Filter by Name or Product ID"
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
            <div className="grid-container">
                <div className="grid-header">
                    <div className="grid-item">Product ID</div>
                    <div className="grid-item">Name</div>
                    <div className="grid-item">Category</div>
                    <div className="grid-item">Price ID</div>
                    <div className="grid-item">Status</div>
                    <div className="grid-item">Action</div>
                </div>
                <div className="grid-body" data-testid="grid-body">
                    {filteredProductList.map((product) => (
                        <div key={product.productId} className="grid-row">
                            <div className="grid-item">{product.productId}</div>
                            <div className="grid-item">{product.name}</div>
                            <div className="grid-item">{product.category}</div>
                            <div className="grid-item">{product.priceId}</div>
                            <div className="grid-item">{product.status}</div>
                            <div className="grid-item">
                                <button
                                    type="button"
                                    className="page-border"
                                    onClick={() => handleSelectProduct(product.productId)}
                                    disabled={isEditing}
                                    data-testid={`edit-button-${product.productId}`}
                                >
                                    Edit
                                </button>
                            </div>
                            {selectedProductId === product.productId && (
                                <ProductDetail
                                    product={product}
                                    onCancel={handleCancel}
                                    handleProductUpdate={handleProductUpdate}
                                />
                            )}
                        </div>
                    ))}
                    {!isNewProductModalOpen && (
                        <div className="grid-row">
                            <div className="grid-item newProduct">
                                <button type="button" className="page-border" onClick={() => setIsNewProductModalOpen(true)}>
                                    Create New Product
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <NewProductModal
                isOpen={isNewProductModalOpen}
                onClose={() => setIsNewProductModalOpen(false)}
                handleNewProduct={addProductToProducts}
            />
        </div>
    );
};

export default Overview;
