const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  getBudgets,
  newBudget,
  deleteBudget,
} = require("../controllers/budgets");

const api = express.Router();

api.use(requireAuth);

api.route("/").get(getBudgets).post(newBudget);
api.route("/:id").delete(deleteBudget);

module.exports = api;
