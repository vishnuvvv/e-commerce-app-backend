import bcrypt from "bcryptjs";
import User from "../models/User";
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const hashedPassword = bcrypt.hashSync(req.body.password);
  const updatedUsername = req.body.username;
  const updatedPassword = hashedPassword;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: updatedUsername,
          password: updatedPassword,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("User has been deleted !");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllUsers = async (req, res) => {
  const query = req.query.count;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(3)
      : await User.find();
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUsersStats = async (req, res) => {
  const date = new Date();
  const lastYearDate = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYearDate } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
