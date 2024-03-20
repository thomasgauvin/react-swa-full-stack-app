import React, { useState, useEffect } from 'react';

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 py-4">
        <div className="container mx-auto">
          <div className="text-white text-2xl font-bold">Contoso</div>
        </div>
      </nav>

      <div className="container mx-auto mt-8 flex">
        <div className="w-1/4">
          <div className="bg-white p-4">
            <div className="text-lg font-semibold mb-4">Items</div>
          </div>
        </div>

        <div className="w-3/4">
          <div className="bg-white p-4">
            <div className="text-lg font-semibold mb-4">Item List</div>
            <div>
              {items.map((item) => (
                <div key={item.id} className="border-b py-2">
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div className="text-gray-600">ID: {item.id}</div>
                  <div className="text-gray-600">Price: ${item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
