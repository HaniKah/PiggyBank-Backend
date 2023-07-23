const Users = require("../schemas/Users");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log("req.body", req.body);

  try {
    const user = await Users.login(email, password);
    // console.log("user", user);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user

const signupUser = async (req, res) => {
  // console.log("body:", req.body);
  const access_token = "";
  const { first_name, last_name, email, password, country_code } = req.body;

  try {
    const user = await Users.signup(
      first_name,
      last_name,
      email,
      password,
      country_code,
      access_token
    );
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// function updateUser
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = {};
    const {
      first_name,
      last_name,
      email,
      password,
      country_code,
      access_token,
    } = req.body;

    if (first_name) updateFields.first_name = first_name;
    if (last_name) updateFields.last_name = last_name;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;
    if (country_code) updateFields.country_code = country_code;
    if (access_token) updateFields.access_token = access_token;

    const user = await Users.findOneAndUpdate({ _id: id }, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, msg: "Your user has been updated", data: user });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// function deleteUser

const deleteOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ success: false, msg: "i don't know this user " });
    } else {
      res
        .status(200)
        .json({ success: true, msg: "your user has been deleted", data: user });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
module.exports = {
  loginUser,
  signupUser,
  updateUser,
  deleteOneUser,
};
