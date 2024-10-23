const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  participants: [{
    name: { type: String, required: true },
    balance: { type: Number, default: 0 }, 
  }],
  expenses: [{
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: String, required: true },
    sharedBy: [{ type: String, required: true }], 
  }],
  totalBill: { type: Number, default: 0 }, 
},{versionkey:false});



const Event = mongoose.model('Event', eventSchema);

module.exports = Event;




