import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import crypto from "crypto";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Keep only the non-duplicate index
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function (): string {
  return jwt.sign(
    { id: this._id, username: this.username },
    config.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function (): string {
  const refreshToken = jwt.sign({ id: this._id }, config.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  this.refreshToken = refreshToken;
  this.save();
  return refreshToken;
};

// Generate email verification token
userSchema.methods.generateVerificationToken = function (): void {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.verificationToken = verificationToken;
  this.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  this.save();
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function (): void {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
  this.save();
};

export const User = mongoose.model<IUser>("User", userSchema);
