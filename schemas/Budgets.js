const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category_name: {
    type: String,
  },
  budget_description: {
    type: String,
  },
  limit_amount: {
    type: String,
  },
  budget_date: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Budgets", budgetSchema);
