import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Breadcrumb from '../../components/Breadcrumb';

const CreateSalesPage = () => {
  const [formData, setFormData] = useState({ id: '', date: '', items: [{ id: '', quantity: 0 }] });
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all items
    fetch('/api/Items')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({ ...formData, items: [...formData.items, { id: '', quantity: 0 }] });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let formDataToSubmit = { ...formData };
    formDataToSubmit.date = new Date(formDataToSubmit.date).toISOString();
    try {
      const response = await fetch('/api/Sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });
      if (!response.ok) {
        throw new Error('Failed to create sale');
      }
      // Redirect to SalesPage after successful creation
      navigate('/sales');
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto flex bg-white min-h-screen p-2">
        {/* Sidebar */}
        <div className="w-1/4 border-r-2 border-gray-100">
          <Navbar />
        </div>

        {/* Form to create new sale */}
        <div className="w-3/4 ml-4">
          <div className="bg-white p-4">
            <Breadcrumb paths={[ { name: 'Sales', url: '/sales' }, { name: 'Create' }]} />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="id" className="block text-gray-700 font-bold mb-2">ID</label>
                <input placeholder="101" type="text" id="id" name="id" value={formData.id} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
                <input placeholder="2024-03-20" type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Items</label>
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <select name="id" value={item.id} onChange={e => handleItemChange(e, index)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2">
                      <option value="">Select Item</option>
                      {items.map(item => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                      ))}
                    </select>
                    <input placeholder="Quantity" type="number" name="quantity" value={item.quantity} onChange={e => handleItemChange(e, index)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
                    <button type="button" onClick={() => handleRemoveItem(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">-</button>
                  </div>
                ))}
                <button type="button" onClick={handleAddItem} className="bg-white border-2 border-blue-500 hover:bg-gray-50 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Item</button>
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Create Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSalesPage;
