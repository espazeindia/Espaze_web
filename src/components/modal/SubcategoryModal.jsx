import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';
import AddSubcategoryModal from './AddSubcategoryModal';
import EditSubcategoryModal from './EditSubcategoryModal';
import DeleteSubcategoryModal from './DeleteSubcategoryModal';

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

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleAdd = (name) => {
    setSubcategories([...subcategories, name]);
  };

  const handleEdit = (newName) => {
    const updated = [...subcategories];
    updated[selectedIndex] = newName;
    setSubcategories(updated);
    setSelectedIndex(null);
  };

  const handleDelete = () => {
    const updated = subcategories.filter((_, i) => i !== selectedIndex);
    setSubcategories(updated);
    setSelectedIndex(null);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-[1000px] bg-[#f5f5f5] shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-[#f5f5f5]">
        <button onClick={onClose} className="text-black hover:text-gray-700">
          <ArrowLeft />
        </button>
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <div className="w-5" />
      </div>

      <div className="flex items-center gap-3 px-6 py-4 bg-[#f5f5f5]">
        <input
          type="text"
          placeholder="Search subcategory..."
          className="flex-grow border border-gray-300 p-2 rounded-md bg-white focus:outline-none focus:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setOpenAddModal(true)}
          className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
        >
           Add
        </button>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {subcategories
            .filter((sub) =>
              sub.toLowerCase().includes(search.toLowerCase())
            )
            .map((sub, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-3 border-b border-gray-200 last:border-b-0"
              >
                <span className="text-base">{sub}</span>
                <div className="flex gap-3">
                  <FaEdit
                    onClick={() => {
                      setSelectedIndex(index);
                      setOpenEditModal(true);
                    }}
                    className="text-green-600 cursor-pointer hover:text-green-800"
                    size={16}
                  />
                  <FaTrash
                    onClick={() => {
                      setSelectedIndex(index);
                      setOpenDeleteModal(true);
                    }}
                    className="text-red-600 cursor-pointer hover:text-red-800"
                    size={16}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      {openAddModal && (
  <AddSubcategoryModal
    isOpen={openAddModal}
    onClose={() => setOpenAddModal(false)}
    onAdd={handleAdd}
  />
)}

{openEditModal && selectedIndex !== null && (
  <EditSubcategoryModal
    isOpen={openEditModal}
    onClose={() => {
      setOpenEditModal(false);
      setSelectedIndex(null);
    }}
    subcategoryToEdit={subcategories[selectedIndex]}
    onEdit={handleEdit}
  />
)}

<DeleteSubcategoryModal
  isOpen={openDeleteModal}
  onClose={() => {
    setOpenDeleteModal(false);
    setSelectedIndex(null); 
  }}
  data={subcategories[selectedIndex]}
  onDelete={handleDelete}  
/>


    </div>
  );
};

export default SubcategoryModal;
