import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './App';
import Product1 from './Product1';
import Product2 from './Product2';
import Product3 from './Product3';
import Product4 from './Product4';
import Product5 from './Product5';
import Product6 from './Product6';
import Product7 from './Product7';
import Product8 from './Product8';
import Product9 from './Product9';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product1" element={<Product1 />} />
        <Route path="/product2" element={<Product2 />} />
        <Route path="/product3" element={<Product3 />} />
        <Route path="/product4" element={<Product4 />} />
        <Route path="/product5" element={<Product5 />} />
        <Route path="/product6" element={<Product6 />} />
        <Route path="/product7" element={<Product7 />} />
        <Route path="/product8" element={<Product8 />} />
        <Route path="/product9" element={<Product9 />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;