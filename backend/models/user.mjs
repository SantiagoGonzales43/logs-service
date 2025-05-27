import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Por favor, ingrese un correo electrónico válido",
    ],
  },
  roles: {
    type: [String],
    default: ["user"],
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const saltRound = 10;
    this.password = await bcrypt.hash(this.password, saltRound);
  }

  this.updatedAt = Date.now();
  next();
});

UserSchema.methods.comparePassword = async function (passwordToCompare) {
  const sonIguales = await bcrypt.compare(passwordToCompare, this.password);
  return sonIguales;
};

const User = mongoose.model("User", UserSchema, "users");

export default User;
