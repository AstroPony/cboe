import productsData from './products.json';

export const fetchProducts = async () => {
    try {
        const sanitizedData = productsData.map((product) => ({
            productId: product.productId || '',
            productGroup: product.productGroup || '',
            name: product.name || '',
            alias: product.alias || '',
            category: product.category || '',
            currency: product.currency || '',
            priceId: product.priceId || '',
            priceConversionFactor: product.priceConversionFactor || 0,
            author: product.author || '',
            approvedBy: product.approvedBy || '',
            status: product.status || '',
        }));
        return sanitizedData;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
};

export const updateProduct = async (updatedProduct) => {
    try {

        productsData.forEach((product, index) => {
            if (product.productId === updatedProduct.productId) {
                productsData[index] = updatedProduct;
            }
        });
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }
};

export const createProduct = async (newProduct) => {
    try {
        const generatedProductId = `NEW_PRODUCT_${productsData.length + 1}`;
        const createdProduct = { ...newProduct, productId: generatedProductId };
        productsData.push(createdProduct);
        return createdProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }
};
