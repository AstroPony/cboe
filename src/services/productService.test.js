import { fetchProducts, updateProduct, createProduct } from './productService';

// Mock the productsData
jest.mock('./products.json', () => [
    {
        productId: 'P1',
        productGroup: 'Group1',
        name: 'Product 1',
        alias: 'Alias 1',
        category: 'Category1',
        currency: 'USD',
        priceId: 'Price1',
        priceConversionFactor: 1.23,
        author: 'Author 1',
        approvedBy: 'Approver 1',
        status: 'Active',
    },
    // Add more mocked products here if needed
]);

describe('productService', () => {
    describe('fetchProducts', () => {
        it('should fetch products correctly', async () => {
            const products = await fetchProducts();
            expect(products).toHaveLength(1);
            expect(products[0]).toHaveProperty('productId', 'P1');
            expect(products[0]).toHaveProperty('name', 'Product 1');
            expect(products[0]).toHaveProperty('status', 'Active');
        });
    });

    describe('updateProduct', () => {
        it('should update a product correctly', async () => {
            const updatedProduct = {
                productId: 'P1',
                productGroup: 'Group1',
                name: 'Updated Product',
                alias: 'Alias 1',
                category: 'Category1',
                currency: 'USD',
                priceId: 'Price1',
                priceConversionFactor: 1.23,
                author: 'Author 1',
                approvedBy: 'Approver 1',
                status: 'Inactive',
            };

            await updateProduct(updatedProduct);

            const products = await fetchProducts();
            const updatedProductInData = products.find((product) => product.productId === 'P1');

            expect(updatedProductInData).toEqual(updatedProduct);
        });
    });

    describe('createProduct', () => {
        it('should create a new product correctly', async () => {
            const newProduct = {
                productGroup: 'New Group',
                name: 'New Product',
                alias: 'Alias 2',
                category: 'Category2',
                currency: 'EUR',
                priceId: 'Price2',
                priceConversionFactor: 2.34,
                author: 'Author 2',
                approvedBy: 'Approver 2',
                status: 'Pending',
            };

            const createdProduct = await createProduct(newProduct);

            const products = await fetchProducts();
            const createdProductInData = products.find((product) => product.productId === createdProduct.productId);

            expect(createdProductInData).toEqual(createdProduct);
        });
    });
});
