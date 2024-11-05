// MoneyForm.js
import React, { useState } from 'react';
import { MdOutlineHistoryEdu } from "react-icons/md";
import {Link} from 'react-router-dom'


const MoneyForm = ({ onAddEntry }) => {
  const [formData, setFormData] = useState({
    type: 'income',
    date: '',
    title: '',
    amount: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddEntry(formData);
    setFormData({ type: 'income', date: '', title: '', amount: '' });
  };

  return (
    <div className="w-full md:w-[38%] mx-4 p-6 border-2 border-[#ccd3b1] rounded-lg shadow-md mb-6">
      <div className='flex justify-between '>
        <h2 className="md:text-xl text-base font-bold mb-4 text-[#43043f]">Add Income/Expense</h2>
         <Link to="/history" className="md:hidden flex text-2xl ml-2"> {/* Use Link instead of a tag */}
          <MdOutlineHistoryEdu className='text-[#550842] hover:text-[#810451]' />
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title (e.g., Salary, Rent)"
            className="w-full p-2 border rounded text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full p-2 border rounded text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm md:text-base">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm md:text-base"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-[#550842] text-white py-2 rounded mt-4 hover:bg-[#810451] text-sm md:text-base">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default MoneyForm;
