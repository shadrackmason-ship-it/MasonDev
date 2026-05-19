import User from "../models/User.js";

/* =========================
   GET CURRENT USER
========================= */
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
    }).select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      bio,
      university,
      location,
      github,
      linkedin,
      portfolio,
      techStack,
      skills,
      profilePicture,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // BASIC INFO
    if (name?.trim()) user.name = name.trim();

    if (bio !== undefined) user.bio = bio;
    if (university !== undefined) user.university = university;
    if (location !== undefined) user.location = location;

    // SOCIAL LINKS
    if (github !== undefined) user.github = github;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (portfolio !== undefined) user.portfolio = portfolio;

    // PROFILE IMAGE
    if (profilePicture !== undefined) {
      user.profilePicture = profilePicture;
    }

    // SKILLS
    if (skills !== undefined) {
      user.skills = Array.isArray(skills)
        ? skills.map((s) => s.toLowerCase().trim())
        : skills.split(",").map((s) => s.toLowerCase().trim());
    }

    // TECH STACK
    if (techStack !== undefined) {
      user.techStack = Array.isArray(techStack)
        ? techStack.map((t) => t.toLowerCase().trim())
        : techStack.split(",").map((t) => t.toLowerCase().trim());
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* =========================
   CONNECT USER
========================= */
export const connectUser = async (req, res) => {
  try {
    const me = await User.findById(req.user._id);
    const other = await User.findById(req.params.id);

    if (!other) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // prevent self connect
    if (me._id.equals(other._id)) {
      return res.status(400).json({
        message: "Cannot connect to yourself",
      });
    }

    // already connected
    if (me.connections.includes(other._id)) {
      return res.status(400).json({
        message: "Already connected",
      });
    }

    // add both users
    me.connections.push(other._id);
    other.connections.push(me._id);

    await me.save();
    await other.save();

    res.json({
      message: "Connected successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};