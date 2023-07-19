import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Overview from './Overview';

// Mock the productService
jest.mock('../../services/productService', () => ({
  fetchProducts: async () => [
    {
      productId: '1',
      name: 'Product 1',
      category: 'Category 1',
      priceId: 'P1',
      status: 'Active',
    },
    {
      productId: '2',
      name: 'Product 2',
      category: 'Category 2',
      priceId: 'P2',
      status: 'Inactive',
    },
  ],
}));

describe('Overview', () => {
  test('should render the component', async () => {
    render(<Overview />);

    // Wait for the data to be fetched and the component to be rendered
    await waitFor(() => {
      // Check for the main heading
      expect(screen.getByText('CBOE - Product Overview')).toBeInTheDocument();

      // Check for the "Create New Product" button
      expect(screen.getByText('Create New Product')).toBeInTheDocument();

      // Check for the product grid headers
      expect(screen.getByText('Product ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Price ID')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  const getByTextInProductRow = (container, text) => {
    const productRows = container.querySelectorAll('.grid-row');
    for (const row of productRows) {
      if (row.textContent.includes(text)) {
        // eslint-disable-next-line testing-library/no-node-access
        return row.querySelector('button');
      }
    }
    return null;
  };

  test('should open the new product modal when "Create New Product" button is clicked', async () => {
    render(<Overview />);

    // Wait for the data to be fetched and the component to be rendered
    await waitFor(() => {
      // Click the "Create New Product" button
      const createNewProductButton = screen.getByText('Create New Product');
      fireEvent.click(createNewProductButton);
    });

    // Wait for the new product modal to be displayed
    const newProductModal = await screen.findByText('New Product Detail');
    expect(newProductModal).toBeInTheDocument();
    expect(screen.getByLabelText('Product ID:')).toBeInTheDocument();
  });

  test('should filter products by name or product ID', async () => {
    render(<Overview />);

    // Wait for the data to be fetched and the component to be rendered
    await waitFor(() => {
      // Type "Product 1" in the search input
      const searchInput = screen.getByPlaceholderText('Filter by Name or Product ID');
      fireEvent.change(searchInput, { target: { value: 'Product 1' } });
    });

    // Check if only the filtered product is displayed
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  // Add more tests for other functionalities as needed...
});
