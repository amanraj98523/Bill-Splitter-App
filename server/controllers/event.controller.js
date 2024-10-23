// const Event = require('../models/Event');

const Event = require("../models/event.model");


const createEvent = async (req, res) => {
  try {
    const { eventName, participants } = req.body;

    // Create a new event with participants and initial balances
    const newEvent = new Event({
      eventName,
      participants
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a new expense to an existing event
const addExpense = async (req, res) => {
  try {
    const { eventId } = req.params; // Event ID from URL params
    const { description, amount, paidBy, sharedBy } = req.body; // Expense details from request body

    // Find the event by its ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create a new expense object
    const newExpense = {
      description,
      amount,
      paidBy,
      sharedBy,
    };

    // Add the expense to the event's expenses array
    event.expenses.push(newExpense);

    // Distribute the expense among participants and update their balances
    const amountPerParticipant = amount / sharedBy.length;

    // Deduct the owed amount from each participant who shared the expense
    sharedBy.forEach((participantName) => {
      const participant = event.participants.find(p => p.name === participantName);
      if (participant) {
        participant.balance -= amountPerParticipant; // Each owes this amount
      }
    });

    // Add the total amount to the payer's balance
    const payer = event.participants.find(p => p.name === paidBy);
    if (payer) {
      payer.balance += amount; // Payer is owed the total amount
    }

    // Recalculate the total bill for the event
    event.totalBill += amount;

    // Save the updated event
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get event details along with participant balances
const getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event by its ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Respond with the event details
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {getEventDetails, addExpense ,createEvent}