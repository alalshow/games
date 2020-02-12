const mongoose = require('mongoose');

// Define Schemes
const gameSchema = new mongoose.Schema(
  {
    gameid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    url: { type: String, required: false },
    image_url: { type: String, required: false },
    summary: { type: String, required: false },
    meta: { type: String, required: false },
    price: { type: String, required: false },
    _id: { type: String, select: false },
    createdAt: { type: String, select: false },
    updatedAt: { type: String, select: false },
    __v: { type: String, select: false },
  },
  {
    timestamps: true,
  },
);

// Create new game document
gameSchema.statics.create = function(payload) {
  const game = new this(payload);
  return game.save();
};

// Find All
gameSchema.statics.findAll = function() {
  return this.find({});
};

// Find One by gameid
gameSchema.statics.findOneByGameId = function(gameid) {
  return this.findOne({ gameid });
};

// Update by gameid
gameSchema.statics.updateByGameId = function(gameid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ gameid }, payload, { new: true });
};

// Delete by gameid
gameSchema.statics.deleteAll = function() {
  return this.remove();
};

// Delete by gameid
gameSchema.statics.deleteByGameId = function(gameid) {
  return this.remove({ gameid });
};

// Create Model & Export
module.exports = mongoose.model('game', gameSchema);
