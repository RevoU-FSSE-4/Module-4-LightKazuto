import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'; 

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [userName, setName]= useState<string>("")
const [response, setResponse] = useState<string>("");

  async function handleLogout(event: any) {
    event.preventDefault();
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/logout",
        options
      );
      if (!response.ok) {
        throw new Error("failed to logout");
      }
      const result = await response.json();
      console.log(result.token);

      setTimeout(() => {
        alert("Logout Success");
        localStorage.clear();
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() =>{
    async function getProfile() {
      const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      };

      try {
      const response = await fetch('https://library-crud-sample.vercel.app/api/user/profile', options);
      if (!response.ok) {
        throw new Error('failed to get profile');
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setResponse(JSON.stringify(jsonData))
    } catch (error) {
      console.error('Error', error);
    }
    }
    getProfile()
  },[]);

  
  return (
    <header className="bg-gray-100 p-4 absolute top-0 w-full">
  <div className="flex justify-between items-center">
    <h1 className="text-xl font-bold">My Florist</h1>
    <ul className="coloum space-x-4">
      <li>Hello</li>
      <li>{response}</li>
    </ul>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
    >
      Logout
    </button>
  </div>
</header>
  );
};

export default HeaderComponent;
