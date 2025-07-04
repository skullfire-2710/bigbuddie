import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Role can be: user, admin, superadmin, parent
    role: {
      type: String,
      enum: ["user", "admin", "superadmin", "parent"],
      default: "user",
    },
    mainrole: {
      type: String,
      enum: ["user", "admin", "superadmin", "parent"],
      default: "user",
    },
    // For parent accounts: list of supervised student User _ids
    children: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    subscription: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
