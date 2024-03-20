import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Breadcrumb from '../../components/Breadcrumb';

const EditItemsPage = () => {
  const [formData, setFormData] = useState({ id: '', title: '', price: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch item data based on the provided id
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/Items/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/Items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      navigate('/items');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto flex bg-white min-h-screen p-2">
        {/* Sidebar */}
        <div className="w-1/4 border-r-2 border-gray-100">
          <Navbar />
        </div>

        {/* Form to edit item */}
        <div className="w-3/4 ml-4">
          <div className="bg-white p-4">
            <Breadcrumb paths={[{ name: 'Items', url: '/items' }, { name: 'Edit' }]} />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="id" className="block text-gray-700 font-bold mb-2">ID</label>
                <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
                <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemsPage;
