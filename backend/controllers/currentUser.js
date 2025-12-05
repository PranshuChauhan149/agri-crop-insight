import User from "../models/User.model.js";

export const currentUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    if (!userId) {
      return res.json({ success: false, message: "UserId not found" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};
