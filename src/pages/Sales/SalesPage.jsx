import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Breadcrumb from "../../components/Breadcrumb";

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [itemPrices, setItemPrices] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/Sales")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSales(data);
        fetchItemPrices();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fetchItemPrices = async () => {
    try {
      const response = await fetch("/api/Items");
      if (!response.ok) {
        throw new Error("Failed to fetch item prices");
      }
      const items = await response.json();
      setItems(items);
      const prices = {};
      items.forEach((item) => {
        prices[item.id] = item.price;
      });
      setItemPrices(prices);
    } catch (error) {
      console.error("Error fetching item prices:", error);
    }
  };

  const calculateRevenueForItem = (item, quantity) => {
    const itemPrice = itemPrices[item.id] || 0; // Use 0 if price is not available
    return itemPrice * quantity;
  };

  const calculateTotalRevenue = (sale) => {
    return sale.items.reduce((acc, item) => {
      const itemPrice = itemPrices[item.id] || 0; // Use 0 if price is not available
      return acc + itemPrice * item.quantity;
    }, 0);
  };

  const handleDelete = async (saleId) => {
    try {
      const response = await fetch(`/api/Sales/${saleId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete sale");
      }
      setSales(sales.filter((sale) => sale.id !== saleId));
    } catch (error) {
      console.error("Error deleting sale:", error);
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
            <Breadcrumb paths={[{ name: "Sales" }]} />
            <div>
              {sales.map((sale) => (
                <div key={sale.id} className="border-b p-4 hover:bg-gray-50">
                  <div className="flex flex-row justify-between content-center">
                    <div className="text-lg font-semibold">
                      Sale ID: {sale.id}
                    </div>
                    <div>
                      <div>
                        <Link
                          to={`/sales/edit/${sale.id}`} // Link to the edit sale page
                          className="text-blue-500 hover:text-blue-700 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(sale.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-600">
                    Date: {new Date(sale.date).toISOString().split("T")[0]}
                  </div>
                  <div>
                    <div className="font-semibold">Items:</div>
                    <table className="w-full">
                      {sale.items.map((item, index) => (
                        <tr key={index}>
                          <td className="w-[20rem]">#{item.id} - {items.find((i) => i.id === item.id)?.title}</td>
                          <td>Quantity: {item.quantity}</td>
                          <td className="text-right">
                            ${calculateRevenueForItem(item, item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </table>
                    <div className="text-lg font-semibold mt-2 text-right">
                      Total: ${calculateTotalRevenue(sale)}
                    </div>
                  </div>

                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                to="/sales/create"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create New Sale
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
