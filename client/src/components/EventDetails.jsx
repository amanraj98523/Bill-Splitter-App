import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams(); 
  const [eventDetails, setEventDetails] = useState(null);

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

  return (
    <div className="card">
      <h3>Event Details</h3>
      <button className="button" onClick={fetchEventDetails}>Get Event Details</button>
      {eventDetails && (
        <div>
          <h4>{eventDetails.eventName}</h4>
          <h5>Total Bill:- {eventDetails.totalBill} ₹</h5>
          <h5>Participants:</h5>
          <ul>
            {eventDetails.participants.map((participant) => (
              <li key={participant.name}>
                {participant.name}:{participant.balance} ₹
              </li>
            ))}
          </ul>
          <h5>Expenses:</h5>
          <ul>
            {eventDetails.expenses.map((expense, index) => (
              <li key={index}>
                {expense.description}:- {expense.amount} ₹ , Paid By:- {expense.paidBy}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
