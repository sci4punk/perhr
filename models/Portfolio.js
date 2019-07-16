
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const portfolioSchema = new Schema({
  siteName: { type: String, required: true },
  siteDomain: { type: String, unique: true, required: true },
  siteIcon: { type: String, unique: true, required: true }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;