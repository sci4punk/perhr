
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const skillSchema = new Schema({
  name: {type: String, unqiue: true, required: true},
  icon: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const SkillModel = mongoose.model("Skill", skillSchema);

module.exports = Skill;