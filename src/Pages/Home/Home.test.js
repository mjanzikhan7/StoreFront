import { render, screen } from '@testing-library/react';
import App from '../../App';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

test('renders Home Page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Explore/i);
  expect(linkElement).toBeInTheDocument();
});

test('Check For Navbar render', () => {
  render(<App />);
  expect(screen.getByText('Products')).toHaveAttribute('href', '/products')
});
