import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import i18n from './i18n'; 
import Home from './Home.tsx';
import Room from './Room.tsx';
import Guide from './Guide.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/room/:roomname',
    element: <Room />,
  },
  {
    path: '/guide',
    element: <Guide />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);