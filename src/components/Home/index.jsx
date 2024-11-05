import React from 'react';
import Navbar from '../Navbar';
import MoneyForm from '../MoneyForm';
import { FaSearch } from 'react-icons/fa';
import './index.css';

const Home = ({ totalIncome, totalExpenses, walletBalance, onAddEntry, entries }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar walletBalance={walletBalance} />
      <div className="flex justify-between p-5 totalfont">
        <div className="flex flex-col border-2 border-[#c8d3ae] rounded-[10px] p-4 w-[48%]">
          <h1 className="text-sm text-[#4f0438] mb-4 md:text-xl">Total Income</h1>
          <p className="font-bold text-3xl text-[green]">{totalIncome}</p>
        </div>
        <div className="flex flex-col border-2 border-[#c8d3ae] rounded-[10px] p-4 w-[48%]">
          <h1 className="text-[#4f0438] text-sm mb-4 md:text-xl">Total Expenses</h1>
          <p className="font-bold text-3xl text-[#cd0909]">{totalExpenses}</p>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-between p-1">
        <MoneyForm onAddEntry={onAddEntry} />
        <div className="w-full md:w-[58%] mx-4 p-6 border-2 border-[#ccd3b1] rounded-lg shadow-md mb-6 md:flex flex-col hidden">
          <h2 className="text-xl font-bold mb-8">Entry History</h2>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="flex-grow p-2 border rounded-l-md focus:outline-none text-sm md:text-base"
            />
            <button className="bg-[#550842] text-white p-3 rounded-r-md flex items-center">
              <FaSearch />
            </button>
          </div>

          <div className="w-full">
            {/* Display filtered entries */}
            {filteredEntries.map((entry, index) => (
              <div key={entry.id} className="entry-row">
                <span>{index + 1}</span>
                <span>{entry.title}</span>
                <span>{entry.date}</span>
                <span className={entry.type === 'income' ? 'text-green-600' : 'text-red-700'}>
                  {entry.type}
                </span>
                <span>₹ {entry.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
