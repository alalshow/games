import mongoose from 'mongoose';

// Define Schemes
// Define Schemes
const gameSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    url: { type: String, required: false },
    image_url: { type: String, required: false },
    summary: { type: String, required: false },
    meta: { type: String, required: false },
    price: { type: String, required: false },
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

// Create new game document
gameSchema.statics.createMany = function(array) {
  return this.insertMany(array);
};

// Find All
gameSchema.statics.findAll = function() {
  return this.find({});
};

// Find One by id
gameSchema.statics.findOneById = function(id) {
  return this.findOne({ id });
};

// Update by id
gameSchema.statics.updateById = function(id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ id }, payload, { new: true });
};

// Delete by id
gameSchema.statics.deleteAll = function() {
  return this.deleteMany({});
};

// Delete by id
gameSchema.statics.deleteById = function(id) {
  return this.deleteOne({ id });
};

// Create Model & Export
const game = mongoose.model('game', gameSchema);

export default game;
