import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";

const ItemsPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/Items")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`/api/Items/${itemId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto flex bg-white min-h-screen p-2">
        <div className="w-1/4 border-r-2 border-gray-100">
          <Navbar />
        </div>

        <div className="w-3/4 ml-4">
          <div className="bg-white p-4">
            <Breadcrumb paths={[{ name: "Items" }]} />
            <div>
              {items.map((item) => (
                <div key={item.id} className="border-b py-2">

                  <div className="flex justify-between">
                    <div className="text-lg font-semibold">#{item.id} - {item.title}</div>
                    <div className="text-gray-600">${item.price}</div>
                  </div>

                  <div className="flex justify-end">
                    <Link
                      to={`/items/edit/${item.id}`}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                to="/items/create"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create New Item
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
