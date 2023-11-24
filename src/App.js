import { Routes } from './Components/Routes';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from 'react-query'
import { queryClient } from './Utils/utils';
import { CartProvider } from './Components/Cart/CartProvider';

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={ queryClient } >
        <ChakraProvider>
          <BrowserRouter>
            <CartProvider>
              <Routes/>
            </CartProvider>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
