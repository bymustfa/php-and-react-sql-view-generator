import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App'; 
import { ChakraProvider, ColorModeScript  } from "@chakra-ui/react"
import theme from './utils/theme';

import dotenv from 'dotenv';
dotenv.config();


ReactDOM.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);

 