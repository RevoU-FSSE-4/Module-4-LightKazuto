import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Category } from "../type/category";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = () => {
  const navigate = useNavigate();

  const initialValues: Category = {
    id: "",
    category_name: "",
    category_description: "",
    is_active: true,
  };

  const handleSubmit = async (data: Category) => {
    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/category/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            category_name: data.category_name,
            category_description: data.category_description,
            is_active: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      setTimeout(() => {
        alert("create process success");
        navigate("/dashboard");
      });

      console.log("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="space-y-4">
          <div>
            <label htmlFor="categoryName" className="block mb-1">
              Category Name:
            </label>
            <Field
              type="text"
              id="categoryName"
              name="category_name"
              placeholder="Enter category name"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="category_name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <label htmlFor="categoryDescription" className="block mb-1">
              Category Description:
            </label>
            <Field
              as="textarea"
              id="categoryDescription"
              name="category_description"
              placeholder="Enter category description"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="category_description"
              component="div"
              className="text-red-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Add Category
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddCategoryForm;
