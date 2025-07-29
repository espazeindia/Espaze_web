import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';

const initialSubcategories = {
  1: ['Tomatoes', 'Onions', 'Potatoes'],
  2: ['Fiction', 'Non-fiction', 'Academic'],
  3: ['Washing Machine', 'Microwave'],
  4: ['Men', 'Women'],
};

const SubcategoryModal = ({ category, onClose }) => {
  const [search, setSearch] = useState('');
  const [subcategories, setSubcategories] = useState(
    initialSubcategories[category.id] || []
  );

  const handleAdd = () => {
    const newSub = prompt('Enter new subcategory name:');
    if (newSub) {
      setSubcategories([...subcategories, newSub]);
    }
  };

  const handleEdit = (index) => {
    const newName = prompt('Edit subcategory name:', subcategories[index]);
    if (newName) {
      const updated = [...subcategories];
      updated[index] = newName;
      setSubcategories(updated);
    }
  };

  const handleDelete = (index) => {
    const updated = subcategories.filter((_, i) => i !== index);
    setSubcategories(updated);
  };

  return (
    <div className="fixed top-0 right-0 w-[360px] h-full bg-white shadow-lg z-50 border-l border-gray-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          <ArrowLeft />
        </button>
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <div className="w-5" />
      </div>

      {/* Search + Add */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-100">
        <input
          type="text"
          placeholder="Search subcategory..."
          className="flex-grow border border-gray-300 p-2 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
  onClick={handleAdd}
  className="px-3 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
>
  + Add
</button>

      </div>

      {/* Subcategory List */}
      <div className="flex-grow overflow-y-auto px-4 py-2 space-y-2">
        {subcategories
          .filter((sub) =>
            sub.toLowerCase().includes(search.toLowerCase())
          )
          .map((sub, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-2 bg-white rounded-md shadow-sm"
            >
              <span>{sub}</span>
             <div className="flex gap-2">
  <FaEdit
    onClick={() => handleEdit(cat.id)}
    className="text-green-600 cursor-pointer hover:text-green-800"
    size={16}
  />
  <FaTrash
    onClick={() => handleDelete(cat.id)}
    className="text-red-600 cursor-pointer hover:text-red-800"
    size={16}
  />
</div>

      </div>
          ))}
      </div>
    </div>
  );
};

export default SubcategoryModal;
