import React, { useState } from 'react';
import Navbar from '../Navbar';
import { FaSearch } from 'react-icons/fa';
import { IoRemoveCircleOutline } from "react-icons/io5";
import { LuDownloadCloud } from "react-icons/lu";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./index.css"


const Entries = ({ entries, onRemoveEntry, walletBalance }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadPDF = () => {
  const input = document.getElementById('entry-table');
  
  html2canvas(input, { scale: 2 }).then((canvas) => { // Increase scale for better quality
    const pdf = new jsPDF('p', 'mm', 'a4'); // Use A4 size
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // Width for A4
    const pageHeight = pdf.internal.pageSize.height; // Get the page height
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the image height
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('entries.pdf');
  });
};


  return (
    <>
      <Navbar walletBalance={walletBalance} />
      <div className="p-6">
        <div className='flex items-center justify-between'>
        <h2 className="text-xl font-bold mb-8">Entry History</h2>
          <button 
          onClick={downloadPDF} 
          className="bg-none text-[#4a013a] rounded-md mb-7"
        >
          <LuDownloadCloud className='text-[#570042] text-3xl'/>
        </button> 
        </div>
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
