import User from "../models/User.model.js";

export const currentUser = async (req, res) => {
  try {
    // ✅ Make sure this comes from auth middleware
    const userId = req.userId;  

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Current User Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
