import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './utils/context';

const rootElement: HTMLElement = document.getElementById('root') as HTMLElement;
if (!rootElement) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter basename='/'/**otogemap'**/>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
