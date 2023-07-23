const express = require("express");

const {
  updateUser,
  deleteOneUser,
  loginUser,
  signupUser,
} = require("../controllers/users");

const api = express.Router();

//login
api.post("/login", loginUser);

//signup
api.post("/signup", signupUser);

// DEFAULT ROUTE   ---- PATH TO create a new user
// api.route("/").post(newUser);

// Path to update or to delete user
api.route("/:id").put(updateUser).delete(deleteOneUser);

// Path to get budgets from one User
// api.route("/:id/budget").get(budget);
// api.route("/:id/budget").post(budget);

module.exports = api;
