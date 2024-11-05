import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { FaSearch } from 'react-icons/fa';
import {IoRemoveCircleOutline } from "react-icons/io5";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Entries = ({ entries, onRemoveEntry, walletBalance }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar walletBalance={walletBalance} />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-8">Entry History</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-2 border rounded-l-md focus:outline-none text-sm md:text-base"
          />
          <button className="bg-[#550842] text-white p-3 rounded-r-md flex items-center">
            <FaSearch />
          </button>
        </div>

        <div id="entry-table" className="w-full">
          <ul className="grid grid-cols-5 gap-2 sm:gap-4 text-left mb-2 font-bold text-[#43042c] px-2 sm:px-4">
            <li>#</li>
            <li>Title</li>
            <li>Date</li>
            <li>Type</li>
            <li>Amount</li>
          </ul>
          {filteredEntries.map((entry, index) => (
            <ul key={entry.id} className="p-2 sm:p-4 border-b border-[#cbf9c0] grid grid-cols-5 gap-2 sm:gap-4 text-left px-2 sm:px-4">
              <li className="text-sm sm:text-sm">{index + 1}</li>
              <li className="text-sm sm:text-sm flex items-center overflow-hidden max-w-xs">
                <span className="truncate">{entry.title}</span>
              </li>
              <li className="text-sm sm:text-sm">{entry.date}</li>
              <li className={`text-sm sm:text-sm ${entry.type === "income" ? 'text-green-600' : 'text-red-700'}`}>
                {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
              </li>
              <li className="text-sm sm:text-base text-[#6d0445] flex items-center">
                ₹ {entry.amount}
                <button 
                  onClick={() => onRemoveEntry(entry.id)} 
                  className="text-red-600 hover:text-red-800 ml-2"
                >
                  <IoRemoveCircleOutline />
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default Entries;

