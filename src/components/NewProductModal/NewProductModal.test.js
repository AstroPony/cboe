import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

import NewProductModal from './NewProductModal';

describe('NewProductModal', () => {
  it('should render closed modal when isOpen is false', () => {
    render(<NewProductModal isOpen={false} />);
    expect(screen.queryByText('New Product Detail')).not.toBeInTheDocument();
  });

  it('should render open modal when isOpen is true', () => {
    render(<NewProductModal isOpen={true} />);
    expect(screen.getByText('New Product Detail')).toBeInTheDocument();
  });

  it('should call onClose when "Cancel" button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<NewProductModal isOpen={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call handleNewProduct and onClose when "Save" button is clicked', () => {
    const handleNewProductMock = jest.fn();
    const onCloseMock = jest.fn();

    render(<NewProductModal isOpen={true} handleNewProduct={handleNewProductMock} onClose={onCloseMock} />);

    // Simulate input changes
    fireEvent.change(screen.getByRole('textbox', { name: /product id/i }), { target: { value: '123' } });
    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByRole('textbox', { name: /product group/i }), { target: { value: 'Group1' } });
    fireEvent.change(screen.getByRole('textbox', { name: /alias/i }), { target: { value: 'Test Alias' } });
    fireEvent.change(screen.getByRole('textbox', { name: /product type/i }), { target: { value: 'Type1' } });
    fireEvent.change(screen.getByRole('textbox', { name: /category/i }), { target: { value: 'Category1' } });
    fireEvent.change(screen.getByRole('textbox', { name: /currency/i }), { target: { value: 'USD' } });
    fireEvent.change(screen.getByRole('textbox', { name: /price id/i }), { target: { value: 'P1' } });
    fireEvent.change(screen.getByRole('textbox', { name: /price conversion factor/i }), { target: { value: '1.23' } });
    fireEvent.change(screen.getByRole('textbox', { name: /author/i }), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByRole('textbox', { name: /approved by/i }), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByRole('textbox', { name: /status/i }), { target: { value: 'Active' } });

    // Simulate button click
    fireEvent.click(screen.getByText('Save'));

    // Assertions
    expect(handleNewProductMock).toHaveBeenCalledTimes(1);
    expect(handleNewProductMock).toHaveBeenCalledWith({
      productId: '123',
      productGroup: 'Group1',
      name: 'Test Product',
      alias: 'Test Alias',
      productType: 'Type1',
      category: 'Category1',
      currency: 'USD',
      priceId: 'P1',
      priceConversionFactor: '1.23',
      author: 'John Doe',
      approvedBy: 'Jane Smith',
      status: 'Active',
    });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
