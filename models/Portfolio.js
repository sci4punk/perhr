
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const portfolioSchema = new Schema({
  name: String,
  url: String,
  icon: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const PortfolioModel = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;