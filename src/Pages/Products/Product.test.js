import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor, within } from '@testing-library/react';
import App from '../../App';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe('Testing Product Page', () => {
  test('Navigate to Product Page', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Products'))
    expect(screen.getByText('All Products')).toBeTruthy();
  });
  
  test('Render Products', async () => {
    render(<App />);
    await waitFor(() => screen.findByText('All Products'))
    await waitForElementToBeRemoved(() => screen.queryByTestId('skeleton-product-list'), { timeout: 2000 })
    const products = screen.getAllByTestId('product-item')
    expect(products.length).toBeGreaterThan(0);
  });
  
  test('Add To Cart Product', async () => {
    render(<App />);
    const countElem = screen.getByTestId('cart-count')
    const products = screen.getAllByTestId('product-item')
    fireEvent.click(within(products[0]).getByTestId('add-to-cart'))
    expect(Number(countElem.textContent)).toEqual(1)
  });
  
  test('Add Multiple Product To Cart', async () => {
    render(<App />);
    const countElem = screen.getByTestId('cart-count')
    const products = screen.getAllByTestId('product-item')
    const count = 5
    for (let index = 0; index < 5; index++) {
      const product = products[index];
      fireEvent.click(within(product).getByTestId('add-to-cart')) 
    }
    expect(Number(countElem.textContent)).toEqual(count)
  });
})
