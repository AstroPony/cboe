import React from 'react';
import { render } from '@testing-library/react';
import ProductInput from './ProductInput';

describe('ProductInput', () => {
  it('should render label and input field', () => {
    const label = 'Product ID';
    const name = 'productId';

    render(<ProductInput label={label} name={name} />);

    // Check if the label and input elements are rendered
    expect(document.querySelector('label')).toBeInTheDocument();
    expect(document.querySelector('input')).toBeInTheDocument();
  });
});
