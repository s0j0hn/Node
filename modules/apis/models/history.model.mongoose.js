/**
 * Module dependencies
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Data Model Mongoose
 */

const HistoryMongoose = new Schema({
  apiId: String,
  result: {},
  status: Boolean,
  time: Number,
}, {
  timestamps: true,
});

/**
 * @desc Function to add id (+ _id) to all objects
 * @param {Object} scrap
 * @return {Object} Scrap
 */
function addID() {
  return this._id.toHexString();
}

/**
 * Model configuration
 */
HistoryMongoose.virtual('id').get(addID);
// Ensure virtual fields are serialised.
HistoryMongoose.set('toJSON', {
  virtuals: true,
});

mongoose.model('History', HistoryMongoose);
