import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Breadcrumb from '../../components/Breadcrumb';
import RevenueCard from './OverviewRevenueCard';

const OverviewPage = () => {
  const [sales, setSales] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const salesResponse = await fetch('/api/Sales');
      const itemsResponse = await fetch('/api/Items');

      if (!salesResponse.ok || !itemsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const salesData = await salesResponse.json();
      const itemsData = await itemsResponse.json();

      setSales(salesData);
      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Calculate revenue for the past n days
  const calculateRevenueForDays = (days) => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - days);

    const revenue = sales.reduce((acc, sale) => {
      const saleDate = new Date(sale.date);
      if (saleDate >= pastDate && saleDate <= today) {
        acc += calculateTotalRevenue(sale);
      }
      return acc;
    }, 0);

    return revenue;
  };

  // Calculate total revenue for a sale
  const calculateTotalRevenue = (sale) => {
    return sale.items.reduce((acc, item) => {
      const itemData = items.find((i) => i.id === item.id);
      const itemPrice = itemData ? itemData.price : 0;
      return acc + itemPrice * item.quantity;
    }, 0);
  };

  // Get recent sales
  const getRecentSales = () => {
    return sales.slice(0, 5); // Get the first 5 sales
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto flex bg-white min-h-screen p-2">
        <div className="w-1/4 border-r-2 border-gray-100">
          <Navbar />
        </div>

        <div className="w-3/4 ml-4">
          <div className="bg-white p-4">
            <Breadcrumb paths={[{ name: 'Overview' }]} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RevenueCard title="Past 30 Days Revenue" revenue={calculateRevenueForDays(30)} />
              <RevenueCard title="Past 90 Days Revenue" revenue={calculateRevenueForDays(90)} />
              <RevenueCard title="Past 365 Days Revenue" revenue={calculateRevenueForDays(365)} />
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
              <div>
                {getRecentSales().map((sale) => (
                  <div key={sale.id} className="border rounded p-4 mb-4">
                    <p className="text-lg font-semibold">Sale ID: {sale.id}</p>
                    <p className="text-gray-600">Date: {new Date(sale.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">Total Revenue: ${calculateTotalRevenue(sale)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
