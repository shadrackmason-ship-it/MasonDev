import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: "",
    },

    // PROFILE IMAGE
    profilePicture: {
      type: String,
      default: "",
    },

    // SCHOOL
    university: {
      type: String,
      default: "",
    },

    // LOCATION
    location: {
      type: String,
      default: "",
    },

    // SOCIAL LINKS
    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    // SKILLS
    skills: {
      type: [String],
      default: [],
    },

    // TECH STACK
    techStack: {
      type: [String],
      default: [],
    },

    // NETWORKING CONNECTIONS
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);