import React from "react";
import FooterComponent from "../component/footer";
import { useState } from "react";
import HeaderComponent from "../component/header";
import CategoryComponent from "./category";
import AddCategoryForm from "./addCategory";
import { useNavigate } from "react-router-dom";

const DashboardComponent = () => {  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center min-w-full">
      <HeaderComponent />

      <div className="bg-white p-8  w-10/12 border-solid border-2 ">
        <h1 className="mb-4 text-2xl">Welcome to your dashboard!</h1>
        <>
          <CategoryComponent />
        </>
      </div>
      <>
        <br />
        <br />
        <a
          onClick={() => navigate('/addCategory')} 
          className="text-blue-500 hover:underline gap-10"
        >
          Create New
        </a>
      </>

      <FooterComponent />
    </div>
  );
};

export default DashboardComponent;
