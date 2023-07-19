import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {ProductProvider} from './store/ProductContext';

jest.mock('react-router-dom', () => ({
    BrowserRouter: ({children}) => <div>{children}</div>,
}));

jest.mock('./store/ProductContext', () => ({
    ProductProvider: ({children}) => <div>{children}</div>,
}));

test('renders App component', () => {
    render(
        <BrowserRouter>
            <ProductProvider>
                <App/>
            </ProductProvider>
        </BrowserRouter>
    );

    const headerElement = screen.getByText('CBOE - Product Overview');
    expect(headerElement).toBeInTheDocument();
});
