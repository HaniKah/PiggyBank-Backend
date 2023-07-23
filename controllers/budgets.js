const Budgets = require("../schemas/Budgets");

const getBudgets = async (req, res) => {
  try {
    const user = req.user._id;

    //alt
    const budgets = await Budgets.find({ user });
    if (!user) {
      return res.status(404).json({ success: false, msg: "user is not found" });
    } else {
      const data = res.status(200).json(budgets);
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const newBudget = async (req, res) => {
  try {
    const { category_name, budget_description, limit_amount, budget_date } =
      req.body;
    const user = req.user._id;

    const newBudget = await Budgets.create({
      category_name, // HOUSE, TRANSPORTATION
      budget_description,
      limit_amount,
      budget_date,
      user,
    });
    res.status(201).json({ success: true, data: newBudget });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBudget = await Budgets.findByIdAndDelete(id);
    res.status(201).json({ success: true, msg: "budget is deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

module.exports = {
  newBudget,
  getBudgets,
  deleteBudget,
};
