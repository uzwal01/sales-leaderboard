const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    agentName: {
        type: String,
        required: [true, 'Agent name is required'],
        trim: true,  // trim - to remove spaces
    },
    amount: {
        type: Number,
        required: [true, 'Sale amount is required'],
        min: [0, 'Amount cannot be negative'],
    },
    salesCount: {
        type: Number,
        required: [true, 'Number of sales is required'],
        min: [1, 'Must have at least 1 sale'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


// Creating Index for faster queries on agentName
saleSchema.index({ agentName: 1 });

module.exports = mongoose.model('Sale', saleSchema);