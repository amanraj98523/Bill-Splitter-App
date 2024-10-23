import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const Event = () => {
  const [eventName, setEventName] = useState('');
  const [participants, setParticipants] = useState('');
  const [eventId, setEventId] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [sharedBy, setSharedBy] = useState('');
  const [eventDetails, setEventDetails] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  const createEvent = async () => {
    try {
      const response = await axios.post('https://bill-splitter-app.onrender.com/bill/events', {
        eventName,
        participants: participants.split(',').map(name => ({ name, balance: 0 }))
      });
      setEventId(response.data._id);
      alert('Event created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create event');
    }
  };

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
    } catch (error) {
      console.error(error);
      alert('Failed to add expense');
    }
  };

  const fetchEventDetails = async () => {
    if (!eventId) {
      alert('Create an event first');
      return;
    }
    try {
      const response = await axios.get(`https://bill-splitter-app.onrender.com/bill/events/${eventId}`);
      setEventDetails(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch event details');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <h2 className="app-title">Bill Splitter App</h2>
      <button className="toggle-button" onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>

      <div className="card">
        <h3>Create Event</h3>
        <input className="input" type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        <input className="input" type="text" placeholder="Participants (comma separated)" value={participants} onChange={(e) => setParticipants(e.target.value)} />
        <button className="button" onClick={createEvent}>Create Event</button>
      </div>

      <div className="card">
        <h3>Add Expense</h3>
        <input className="input" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="input" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input className="input" type="text" placeholder="Paid By" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} />
        <input className="input" type="text" placeholder="Shared By (comma separated)" value={sharedBy} onChange={(e) => setSharedBy(e.target.value)} />
        <button className="button" onClick={addExpense}>Add Expense</button>
      </div>

      <div className="card">
        <h3>Event Details</h3>
        <button className="button" onClick={fetchEventDetails}>Get Event Details</button>
        {eventDetails && (
          <div>
            <h4>{eventDetails.eventName}</h4>
            <h5>Total Bill: ₹{eventDetails.totalBill}</h5>
            <h5>Participants:</h5>
            <ul>
              {eventDetails.participants.map((participant) => (
                <li key={participant.name}>
                  {participant.name}: ₹{participant.balance}
                </li>
              ))}
            </ul>
            <h5>Expenses:</h5>
            <ul>
              {eventDetails.expenses.map((expense, index) => (
                <li key={index}>
                  {expense.description}: ₹{expense.amount}, Paid By: {expense.paidBy}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
