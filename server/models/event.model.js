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





// eventSchema.pre('save', function (next) {
//   let totalBill = 0;
  

//   this.participants.forEach(participant => participant.balance = 0);
  
//   // Calculate total bill and update participant balances based on expenses
//   this.expenses.forEach(expense => {
//     totalBill += expense.amount;
    
//     const amountPerParticipant = expense.amount / expense.sharedBy.length;
    
//     // Update balances for the participants who shared the expense
//     expense.sharedBy.forEach(participantName => {
//       const participant = this.participants.find(p => p.name === participantName);
//       if (participant) {
//         participant.balance -= amountPerParticipant; // They owe this amount
//       }
//     });
    
//     // Add the amount to the payer's balance (they are owed this amount)
//     const payer = this.participants.find(p => p.name === expense.paidBy);
//     if (payer) {
//       payer.balance += expense.amount;
//     }
//   });
  
//   this.totalBill = totalBill;
//   next();
// });