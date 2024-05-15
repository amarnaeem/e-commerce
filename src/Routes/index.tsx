import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../Pages/Home';
import { ViewProduct } from '../Pages/ViewProduct';
import AppLayout from '../Layout/index'
import { SingleCategory } from '../Pages/SingleCategory';

const Router: React.FC = () => {
  return (
    <BrowserRouter>    
      <Routes>
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/view_product/:id" element={ <AppLayout><ViewProduct /></AppLayout>} />
        <Route path="/category/:categoryName" element={ <AppLayout><SingleCategory/></AppLayout>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
