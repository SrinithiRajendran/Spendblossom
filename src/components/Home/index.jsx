import { useState } from "react";
import Navbar from "../Navbar";
import MoneyForm from "../MoneyForm";
import { FaSearch } from "react-icons/fa";
import { IoRemoveCircleOutline, IoFilterSharp } from "react-icons/io5";
import "jspdf-autotable";
import jsPDF from "jspdf";
import { LuDownloadCloud } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
const Home = ({
  // eslint-disable-next-line react/prop-types
  totalIncome,
  // eslint-disable-next-line react/prop-types
  totalExpenses,
  // eslint-disable-next-line react/prop-types
  walletBalance,
  // eslint-disable-next-line react/prop-types
  onAddEntry,
  // eslint-disable-next-line react/prop-types
  entries,
  // eslint-disable-next-line react/prop-types
  onRemoveEntry,
  isPopupVisible,
  closeRemovePopup,
  handleRemoveEntry,
  entryToRemove,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    minAmount: "",
    maxAmount: "",
    date: "",
  });
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };
  const closePopup = () => {
    setSelectedEntry(null);
  };
  const filteredEntries = entries
    // eslint-disable-next-line react/prop-types
    .filter((entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((entry) => {
      const { type, minAmount, maxAmount, date } = filters;
      const isTypeMatch = type ? entry.type === type : true;
      const isAmountMatch =
        (minAmount ? entry.amount >= parseFloat(minAmount) : true) &&
        (maxAmount ? entry.amount <= parseFloat(maxAmount) : true);
      const isDateMatch = date ? entry.date.includes(date) : true;

      return isTypeMatch && isAmountMatch && isDateMatch;
    });

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["#", "Title", "Date", "Type", "Amount"];
    const tableRows = [];

    filteredEntries.forEach((entry, index) => {
      const entryData = [
        index + 1,
        entry.title,
        entry.date,
        entry.type.charAt(0).toUpperCase() + entry.type.slice(1),
        `Rs. ${entry.amount}`,
      ];
      tableRows.push(entryData);
    });

    doc.setFontSize(16);
    doc.text("Entry History", 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "plain",
      headStyles: {
        fillColor: [120, 26, 95],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      margin: { top: 10 },
    });
    doc.save("entries.pdf");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar walletBalance={walletBalance} />
      <div className="flex justify-between p-5 totalfont">
        <div className="flex flex-col border-2 border-[#4d4d4d] rounded-[10px] p-4 w-[48%]">
          <h1 className="text-sm text-[#4f0438] mb-4 md:text-xl">
            Total Income
          </h1>
          <p className="font-bold text-3xl text-[green]">{totalIncome}</p>
        </div>
        <div className="flex flex-col border-2 border-[#4d4d4d] rounded-[10px] p-4 w-[48%]">
          <h1 className="text-[#4f0438] text-sm mb-4 md:text-xl">
            Total Expenses
          </h1>
          <p className="font-bold text-3xl text-[#cd0909]">{totalExpenses}</p>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-between p-1 ">
        <MoneyForm onAddEntry={onAddEntry} />
        <div className="w-full md:w-[58%] mx-4 p-6 border-2 border-[#4b4b4b] rounded-lg shadow-md mb-6 hidden md:block">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-8">Entry History</h2>
            <button
              onClick={downloadPDF}
              className="bg-none text-[#4a013a] rounded-md mb-7"
            >
              <LuDownloadCloud className="text-[#570042] text-3xl" />
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
            <button
              onClick={() => setFilterVisible(!filterVisible)}
              className="bg-[#000000] text-white p-3 ml-2 rounded-r-md flex items-center"
            >
              <IoFilterSharp />
            </button>
          </div>
          {filterVisible && (
            <div className="mb-6 p-4 border rounded-md bg-gray-100">
              <div className="mb-4 ">
                <label className="block text-sm">Filter by Type:</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="p-2 text-xs mt-2 border rounded-md cursor-pointer"
                >
                  <option value="" className="text-sm">
                    All
                  </option>
                  <option value="income" className="text-sm">
                    Income
                  </option>
                  <option value="expense" className="text-sm">
                    Expense
                  </option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Filter by Amount:</label>
                <input
                  type="number"
                  name="minAmount"
                  placeholder="Min Amount"
                  value={filters.minAmount}
                  onChange={handleFilterChange}
                  className="p-2 border rounded-md mb-2 text-xs"
                />
                <input
                  type="number"
                  name="maxAmount"
                  placeholder="Max Amount"
                  value={filters.maxAmount}
                  onChange={handleFilterChange}
                  className="p-2 border rounded-md text-xs"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm">Filter by Date:</label>
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="p-2 border rounded-md text-xs mt-2"
                />
              </div>
            </div>
          )}

          <div id="entry-table" className="w-full">
            <ul className="grid grid-cols-6 gap-2 sm:gap-4 text-left mb-2 font-bold text-[#43042c] px-2 sm:px-4">
              <li>#</li>
              <li>Title</li>
              <li>Date</li>
              <li>Type</li>
              <li>Amount</li>
            </ul>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry, index) => (
                <ul
                  key={entry.id}
                  className="p-2 sm:p-4 border-b border-[#cbf9c0] grid grid-cols-6 gap-2 sm:gap-4 text-left px-2 sm:px-4"
                  onClick={() => handleEntryClick(entry)}
                >
                  <li className="text-sm sm:text-sm">{index + 1}</li>
                  <li className="text-sm sm:text-sm flex items-center overflow-hidden max-w-xs">
                    <span className="truncate">{entry.title}</span>
                  </li>
                  <li className="text-sm sm:text-sm">{entry.date}</li>
                  <li
                    className={`text-sm sm:text-sm ${
                      entry.type === "income"
                        ? "text-green-600"
                        : "text-red-700"
                    }`}
                  >
                    {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                  </li>
                  <li className="text-sm sm:text-base text-[#6d0445] flex items-center">
                    ₹ {entry.amount}
                  </li>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveEntry(entry.id); // Trigger openRemovePopup with entry.id
                    }}
                    className="text-red-600 hover:text-red-800 ml-2 relative" // Add relative positioning for popup
                  >
                    <IoRemoveCircleOutline />
                  </button>
                </ul>
              ))
            ) : (
              <p className="text-[#5a5858] m-4 font-bold text-center">
                No Result Found
              </p>
            )}
            {/* Render the popup outside the entry list */}
            {entryToRemove && isPopupVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
                <div className="bg-white relative rounded-lg p-6 w-80">
                  <button
                    className="top-2 right-2 absolute rounded hover:text-red-500"
                    onClick={closeRemovePopup} // Close the popup when clicked
                  >
                    <IoClose className="text-lg" />
                  </button>
                  <h2 className="text-center font-bold mb-4 ">
                    <span className="text-[#510b4a] font-bold text-xs md:text-lg">
                      Are you sure you want to permanently remove this entry?
                    </span>
                  </h2>

                  <div className="flex justify-center items-center gap-10">
                    <button
                      onClick={() => {
                        handleRemoveEntry(); // Remove the entry
                        closeRemovePopup(); // Close the popup after handling removal
                      }}
                      className="text-xs bg-green-900 text-white py-2 px-6 rounded-sm"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        closeRemovePopup(); // Close the popup without removing
                      }}
                      className="text-xs bg-red-900 text-white py-2 px-6 rounded-sm"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedEntry && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white relative rounded-lg p-6 w-80">
                  <button
                    className="top-2 right-2 absolute rounded hover:text-[red]"
                    onClick={closePopup}
                  >
                    <IoClose className="text-lg" />
                  </button>
                  <h2 className="text-lg font-bold mb-4">
                    <span className="text-[#510b4a] font-bold">Title : </span>
                    {selectedEntry.title}
                  </h2>
                  <p>
                    <span className="text-[#510b4a] font-bold">Date : </span>{" "}
                    {selectedEntry.date}
                  </p>
                  <p>
                    <span className="text-[#510b4a] font-bold">Type : </span>
                    {selectedEntry.type.charAt(0).toUpperCase() +
                      selectedEntry.type.slice(1)}
                  </p>
                  <p>
                    <span className="text-[#510b4a] font-bold">Amount : </span>{" "}
                    ₹{selectedEntry.amount}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
