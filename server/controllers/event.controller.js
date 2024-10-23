// const Event = require('../models/Event');

const Event = require("../models/event.model");


const createEvent = async (req, res) => {
  try {
    const { eventName, participants } = req.body;

    
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


const addExpense = async (req, res) => {
  try {
    const { eventId } = req.params; 
    const { description, amount, paidBy, sharedBy } = req.body; 

    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    
    const newExpense = {
      description,
      amount,
      paidBy,
      sharedBy,
    };

    
    event.expenses.push(newExpense);

    
    const amountPerParticipant = amount / sharedBy.length;

    
    sharedBy.forEach((participantName) => {
      const participant = event.participants.find(p => p.name === participantName);
      if (participant) {
        participant.balance -= amountPerParticipant; 
      }
    });

    
    const payer = event.participants.find(p => p.name === paidBy);
    if (payer) {
      payer.balance += amount;
    }

  
    event.totalBill += amount;

  
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;

    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {getEventDetails, addExpense ,createEvent}