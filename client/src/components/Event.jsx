
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddExpense from './AddExpense';
import EventDetails from './EventDetails';
import axios from 'axios';
import '../index.css';

const Event = () => {
  const [eventName, setEventName] = useState('');
  const [participants, setParticipants] = useState('');
  const [eventId, setEventId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
        <h2 className="app-title">Bill Splitter App</h2>
        <button className="toggle-button" onClick={toggleDarkMode}>
          Toggle Dark Mode
        </button>

        {}
        {eventId && (
          <div className="navigation">
            <Link to={`/add-expense/${eventId}`} className="button" id="btn1">Go to Add Expense</Link>
            <Link to={`/event-details/${eventId}`} className="button" id="btn2">Go to Event Details</Link>
          </div>
        )}

        <div className="card">
          <h3>Create Event</h3>
          <input className="input" type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          <input className="input" type="text" placeholder="Participants (comma separated)" value={participants} onChange={(e) => setParticipants(e.target.value)} />
          <button className="button" onClick={createEvent}>Create Event</button>
        </div>

        <Routes>
          <Route path="/add-expense/:eventId" element={<AddExpense />} />
          <Route path="/event-details/:eventId" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Event;
