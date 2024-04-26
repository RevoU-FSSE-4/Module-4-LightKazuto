import { useEffect, useState } from "react";
import { Category } from "../type/category";
import { useNavigate } from "react-router-dom";

export default function CategoryComponent() {
  // const [response, setResponse] = useState<UserProfile || null>(null);
  const [catResponse, setCatResponse] = useState<Category[]>([]);
 const navigate = useNavigate()

  useEffect(() => {
    async function getProfile() {}
    getProfile();
    getCategory();
  }, []);

  async function getCategory() {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/category",
        options
      );
      if (!response.ok) {
        throw new Error("Your network response not ok");
      }
      const result = await response.json();
      const data = (result as Category[]) || [];
      setCatResponse(data);
    } catch (error) {
      console.error("Error", error);
    }
  }

  async function deleteCategory(id: any) {
    try {
      const token = localStorage.getItem("token");
      const url = "https://library-crud-sample.vercel.app/api/category/" + id;

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to delete category. Network response not OK.");
      }
      setTimeout(() => {
        alert("Delete Success")
        console.log("Delete Success");
        getCategory();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Category Data</h1>
      <table className="min-w-full border rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Category Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {catResponse.length === 0 ? (
            <tr>
              <td
                className="py-2 px-4 text-center text-2xl font-semibold"
                colSpan={5}>
                <br />
                <br />
                No Data Entry
              </td>
            </tr>
          ) : (
            catResponse.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.category_name}</td>
                <td className="py-2 px-4">{item.category_description}</td>
                <td className="py-2 px-4">{String(item.is_active)}</td>
                <td className="py-2 px-4 flex justify-center space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md">
                    Update
                  </button>
                  <button
                    onClick={() => deleteCategory(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
    </div>
  );
}

