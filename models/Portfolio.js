
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const portfolioSchema = new Schema({
  siteName: { type: String, required: true },
  siteUrl: { type: String, unique: true, required: true },
  siteIcon: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;