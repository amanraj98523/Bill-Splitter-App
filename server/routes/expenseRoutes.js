const express = require('express');
const { createEvent, addExpense, getEventDetails } = require('../controllers/event.controller');
const router = express.Router();
// const eventController = require('../controllers/eventController');

// Create a new event
router.post('/events', createEvent);

// Add an expense to an event
router.post('/events/:eventId/expenses',addExpense);

// Get event details
router.get('/events/:eventId', getEventDetails);

module.exports = router;
