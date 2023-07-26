const Budgets = require("../schemas/Budgets");

const getBudgets = async (req, res) => {
  try {
    let query = {};
    const user = req.user._id;
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 1, 1);
    const endDate = new Date(currentDate.getFullYear(), 12, 0);
    console.log("this is end date".bgGreen, endDate);
    query = { user: user, budget_date: { $gte: startDate, $lte: endDate } };
    const budgets = await Budgets.find(query);
    res.status(200).json(budgets);
  } catch (error) {
    res.status(400).json({ msg: error });
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
