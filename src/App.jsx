import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Entries from "./components/Entries";

const App = () => {
  const [totalIncome, setTotalIncome] = useState(() => {
    return parseFloat(localStorage.getItem("totalIncome")) || 0;
  });
  const [totalExpenses, setTotalExpenses] = useState(() => {
    return parseFloat(localStorage.getItem("totalExpenses")) || 0;
  });
  const [walletBalance, setWalletBalance] = useState(() => {
    return parseFloat(localStorage.getItem("walletBalance")) || 0;
  });
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("entries")) || [];
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [entryToRemove, setEntryToRemove] = useState(null);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("totalIncome", totalIncome.toString());
    localStorage.setItem("totalExpenses", totalExpenses.toString());
    localStorage.setItem("walletBalance", walletBalance.toString());
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [totalIncome, totalExpenses, walletBalance, entries]);

  // Add a new entry
  const handleAddEntry = (entry) => {
    const amount = parseFloat(entry.amount);

    if (entry.type === "income") {
      setTotalIncome((prev) => prev + amount);
      setWalletBalance((prev) => prev + amount);
    } else if (entry.type === "expense") {
      setTotalExpenses((prev) => prev + amount);
      setWalletBalance((prev) => prev - amount);
    }

    setEntries((prevEntries) => [...prevEntries, { ...entry, id: Date.now() }]);
  };

  // Open the remove popup
  const openRemovePopup = (id) => {
    setEntryToRemove(id);
    setIsPopupVisible(true);
  };

  // Close the remove popup
  const closeRemovePopup = () => {
    setEntryToRemove(null); // Reset the entryToRemove state
    setIsPopupVisible(false); // Hide the popup
  };

  // Remove an entry

  const handleRemoveEntry = () => {
    if (!entryToRemove) return;

    const updatedEntries = entries.filter(
      (entry) => entry.id !== entryToRemove
    );
    setEntries(updatedEntries);

    let newTotalIncome = 0;
    let newTotalExpenses = 0;

    updatedEntries.forEach((entry) => {
      const amount = parseFloat(entry.amount);
      if (entry.type === "income") {
        newTotalIncome += amount;
      } else if (entry.type === "expense") {
        newTotalExpenses += amount;
      }
    });

    setTotalIncome(newTotalIncome);
    setTotalExpenses(newTotalExpenses);
    setWalletBalance(newTotalIncome - newTotalExpenses);

    // Close the popup after entry removal
    closeRemovePopup();
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              walletBalance={walletBalance}
              onAddEntry={handleAddEntry}
              onRemoveEntry={openRemovePopup}
              entries={entries}
              isPopupVisible={isPopupVisible}
              closeRemovePopup={closeRemovePopup}
              handleRemoveEntry={handleRemoveEntry}
              entryToRemove={entryToRemove}
            />
          }
        />
        <Route
          path="/history"
          element={
            <Entries
              entries={entries}
              onRemoveEntry={openRemovePopup}
              walletBalance={walletBalance}
              isPopupVisible={isPopupVisible}
              closeRemovePopup={closeRemovePopup}
              handleRemoveEntry={handleRemoveEntry}
              entryToRemove={entryToRemove}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
