import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomeComponent from './Pages/home';
import MultiStepForm from './Pages/signup'
import DashboardComponent from './Pages/dashboard';
import { BrowserRouter } from 'react-router-dom';
import FooterComponent from './component/footer';
import PrivateRoute from './component/PrivateRoute';
// import CategoryComponent from './Pages/category';
import AddCategoryForm from './Pages/addCategory';


function App() {
  return (

    <Routes>
      <Route path='/' element={<HomeComponent />} />
      <Route path='/signup' element={<MultiStepForm />} />
      <Route path='/' element={<PrivateRoute />} >
          <Route path='/dashboard' element={<DashboardComponent />} />
          <Route path='/addCategory' element={<AddCategoryForm />} />
      </Route>
      <Route path='/footer' element={<FooterComponent />} />
    </Routes>

  );
}

export default App;