import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetail from './ProductDetail';
import { ProductContext } from '../../store/ProductContext';

jest.mock('../ProductInput', () => {
  return (props) => (
      <div>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            type="text"
            id={props.name}
            name={props.name}
            value={props.value}
            onChange={(e) => props.onChange(e)}
        />
      </div>
  );
});

describe('ProductDetail', () => {
  const product = {
    productId: 'P1',
    productGroup: 'Group1',
    name: 'Product 1',
    alias: 'Alias 1',
    productType: 'Type1',
    category: 'Category1',
    currency: 'USD',
    priceId: 'Price1',
    priceConversionFactor: 1.23,
    author: 'Author 1',
    approvedBy: 'Approver 1',
    status: 'Active',
  };

  it('should render product details and handle input changes', () => {
    const handleProductUpdate = jest.fn();
    const onCancel = jest.fn();

    render(
        <ProductContext.Provider value={{ saveProduct: jest.fn() }}>
          <ProductDetail product={product} onCancel={onCancel} handleProductUpdate={handleProductUpdate} />
        </ProductContext.Provider>
    );

    // Ensure product details are rendered
    expect(screen.getByLabelText('Product ID')).toHaveValue(product.productId);
    expect(screen.getByLabelText('Product Group')).toHaveValue(product.productGroup);
    // Add more assertions for other fields

    // Simulate input changes
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Name' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Updated Category' } });
    // Add more input changes as needed

    // Ensure input changes are reflected in state
    expect(screen.getByLabelText('Name')).toHaveValue('Updated Name');
    expect(screen.getByLabelText('Category')).toHaveValue('Updated Category');
    // Add more assertions for other fields
  });

  it('should call onCancel when "Cancel" button is clicked', () => {
    const handleProductUpdate = jest.fn();
    const onCancel = jest.fn();

    render(
        <ProductContext.Provider value={{ saveProduct: jest.fn() }}>
          <ProductDetail product={product} onCancel={onCancel} handleProductUpdate={handleProductUpdate} />
        </ProductContext.Provider>
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call handleProductUpdate and saveProduct when "Save" button is clicked', () => {
    const handleProductUpdate = jest.fn();
    const onCancel = jest.fn();

    const saveProduct = jest.fn();

    render(
        <ProductContext.Provider value={{ saveProduct }}>
          <ProductDetail product={product} onCancel={onCancel} handleProductUpdate={handleProductUpdate} />
        </ProductContext.Provider>
    );

    fireEvent.click(screen.getByText('Save'));

    expect(handleProductUpdate).toHaveBeenCalledTimes(1);
    // Add more assertions for handleProductUpdate

    // Ensure that the saveProduct function from the context is called with the updated product
    expect(saveProduct).toHaveBeenCalledTimes(1);
    // Add more assertions for saveProduct
  });
});
