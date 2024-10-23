import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddExpense = () => {
  const { eventId } = useParams(); 
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [sharedBy, setSharedBy] = useState('');

  const addExpense = async () => {
    if (!eventId) {
      alert('Create an event first');
      return;
    }
    try {
      await axios.post(`https://bill-splitter-app.onrender.com/bill/events/${eventId}/expenses`, {
        description,
        amount: Number(amount),
        paidBy,
        sharedBy: sharedBy.split(',')
      });
      alert('Expense added successfully!');
      setDescription('');
      setAmount('');
      setPaidBy('');
      setSharedBy('');
    } catch (error) {
      console.error(error);
      alert('Failed to add expense');
    }
  };

  return (
    <div className="card">
      <h3>Add Expense</h3>
      <input className="input" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="input" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input className="input" type="text" placeholder="Paid By" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} />
      <input className="input" type="text" placeholder="Shared By (comma separated)" value={sharedBy} onChange={(e) => setSharedBy(e.target.value)} />
      <button className="button" onClick={addExpense}>Add Expense</button>
    </div>
  );
};

export default AddExpense;
