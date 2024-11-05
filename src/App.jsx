import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Entries from './components/Entries';

const App = () => {
  const [totalIncome, setTotalIncome] = useState(() => {
    return parseFloat(localStorage.getItem('totalIncome')) || 0;
  });
  const [totalExpenses, setTotalExpenses] = useState(() => {
    return parseFloat(localStorage.getItem('totalExpenses')) || 0;
  });
  const [walletBalance, setWalletBalance] = useState(() => {
    return parseFloat(localStorage.getItem('walletBalance')) || 0;
  });
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem('entries')) || [];
  });

  useEffect(() => {
    localStorage.setItem('totalIncome', totalIncome.toString());
    localStorage.setItem('totalExpenses', totalExpenses.toString());
    localStorage.setItem('walletBalance', walletBalance.toString());
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [totalIncome, totalExpenses, walletBalance, entries]);

  const handleAddEntry = (entry) => {
    const amount = parseFloat(entry.amount);

    if (entry.type === 'income') {
      setTotalIncome((prev) => prev + amount);
      setWalletBalance((prev) => prev + amount);
    } else if (entry.type === 'expense') {
      setTotalExpenses((prev) => prev + amount);
      setWalletBalance((prev) => prev - amount);
    }

    setEntries((prevEntries) => [...prevEntries, { ...entry, id: Date.now() }]);
  };

  const handleRemoveEntry = (id) => {
  
  const updatedEntries = entries.filter((entry) => entry.id !== id);
  setEntries(updatedEntries);

  
  let newTotalIncome = 0;
  let newTotalExpenses = 0;

  updatedEntries.forEach((entry) => {
    const amount = parseFloat(entry.amount);
    if (entry.type === 'income') {
      newTotalIncome += amount;
    } else if (entry.type === 'expense') {
      newTotalExpenses += amount;
    }
  });

  setTotalIncome(newTotalIncome);
  setTotalExpenses(newTotalExpenses);
  setWalletBalance(newTotalIncome - newTotalExpenses);
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
              onRemoveEntry={handleRemoveEntry}
              entries={entries}
            />
          }
        />
        <Route
          path="/history"
          element={
            <Entries
              entries={entries}
              onRemoveEntry={handleRemoveEntry}
              walletBalance={walletBalance}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
