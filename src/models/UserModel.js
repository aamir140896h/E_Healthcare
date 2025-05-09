import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "PATIENT", "DOCTOR"],
      default: "PATIENT",
    },
  },
  {
    timestamps: true, // 👈 this line enables createdAt & updatedAt
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
  //   if (this.isModified("password")) {
  //     try {
  //       const hashedPassword = await bcrypt.hash(this.password, 10);
  //       this.password = hashedPassword;
  //       next();
  //     } catch (error) {
  //       next(error);
  //     }
  //   } else {
  //     next();
  //   }
});

export const User = mongoose.model("User", userSchema);
