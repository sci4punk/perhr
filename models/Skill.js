
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const skillSchema = new Schema({
  name: { type: String, unique: true, required: true },
  icon: { type: String, default: '/images/default.png' }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;