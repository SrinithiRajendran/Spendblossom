import { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { IoRemoveCircleOutline, IoFilterSharp } from "react-icons/io5";
import "jspdf-autotable";
import jsPDF from "jspdf";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";

const Filters = ({
  entries,
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

  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry) =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((entry) => {
        const { type, minAmount, maxAmount, date } = filters;
        return (
          (type ? entry.type === type : true) &&
          (minAmount ? entry.amount >= parseFloat(minAmount) : true) &&
          (maxAmount ? entry.amount <= parseFloat(maxAmount) : true) &&
          (date ? entry.date.includes(date) : true)
        );
      });
  }, [entries, searchQuery, filters]);

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
    <div className="mx-4 p-6 border-2 font-mono border-[#e0e0e0] rounded-lg shadow-md">
      <div className="flex items-center  justify-between">
        <h2 className="text-md md:text-xl font-bold mb-8">Entry History</h2>
        <button
          onClick={downloadPDF}
          className="bg-none text-[#4a013a] rounded-md mb-7"
        >
          <FaCloudDownloadAlt className="text-[#570042] text-3xl" />
        </button>
      </div>
      <div className="flex items-center mb-4 justify-between">
        <div className="flex w-[100%]">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[100%] p-2 border rounded-l-md focus:outline-none text-sm md:text-base"
          />
          <button className="bg-[#c2c2c2] text-[black] p-3 rounded-r-md flex items-center">
            <FaSearch />
          </button>
        </div>

        <button
          onClick={() => setFilterVisible(!filterVisible)}
          className="bg-[#000000] text-white p-3 ml-2 rounded-r-md flex items-center"
        >
          {filterVisible ? <AiOutlineClose /> : <IoFilterSharp />}
        </button>
      </div>
      {filterVisible && (
        <div className="mb-6 p-4 border rounded-md bg-gray-100">
          <div className="mb-4">
            <label className="block text-sm">Filter by Type:</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="p-2 text-xs mt-2 border rounded-md cursor-pointer "
            >
              <option value="" className="text-sm ">
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

      <div
        id="entry-table"
        className="w-full h-[65vh] overflow-y-scroll custom-scrollbar"
      >
        <ul className="grid grid-cols-6 gap-2 sm:gap-4 text-[12px] sm:text-[14px] text-left mb-2 font-bold text-[#43042c] mt-4">
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
              className=" border-b border-[#cbf9c0]  gap-2 sm:gap-4 py-4"
              onClick={() => handleEntryClick(entry)}
            >
              <div className=" grid grid-cols-6 gap-2 sm:gap-4 items-start">
                <li className="text-[11px] sm:text-sm">{index + 1}</li>
                <li className="text-[11px] sm:text-sm flex items-center overflow-hidden max-w-xs">
                  <span className="truncate">{entry.title}</span>
                </li>
                <li className="text-[11px] truncate sm:text-sm">
                  {entry.date}
                </li>
                <li
                  className={`text-[11px] sm:text-sm truncate ${
                    entry.type === "income" ? "text-green-600" : "text-red-700"
                  }`}
                >
                  {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                </li>
                <li className="text-[11px] sm:text-base text-[#6d0445] flex items-center">
                  <span className="text-[#000000]">₹</span>
                  {entry.amount}
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
              </div>
            </ul>
          ))
        ) : (
          <p className="text-[#5a5858] m-4 font-bold text-center">
            No Result Found
          </p>
        )}
        {/* Render the popup outside the entry list */}
        {entryToRemove && isPopupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white relative rounded-lg p-6 w-80">
              <button
                className="top-2 right-2 absolute rounded hover:text-red-500"
                onClick={closeRemovePopup} // Close the popup when clicked
              >
                <IoClose className="text-lg" />
              </button>
              <h2 className="text-center font-bold mb-4 text-lg text-[#510b4a]">
                Are you sure you want to permanently remove this entry?
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
                <span className="text-[#510b4a] font-bold">Amount : </span> ₹
                {selectedEntry.amount}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Filters.propTypes = {
  entries: PropTypes.array.isRequired,
  onRemoveEntry: PropTypes.func.isRequired,
  isPopupVisible: PropTypes.bool.isRequired,
  closeRemovePopup: PropTypes.func.isRequired,
  handleRemoveEntry: PropTypes.func.isRequired,
  title: PropTypes.string,
  entryToRemove: PropTypes.object,
};

export default Filters;
