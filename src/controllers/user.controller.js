import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;



    const query = {};

    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query).sort({createdAt: -1}).limit(Number(limit)).skip((Number(page)- 1) * Number(limit));

    res.json({
        success : true,
        total,
        count : users.length,
        users
    })

  } catch (error) {
    next(error);
  }
};


export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const toggleUserStatus = async (req, res, next) => {
  try {
    // Prevent admin from deactivating themselves
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot deactivate your own account.',
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully.`,
      user,
    });
  } catch (error) {
    next(error);
  }
};