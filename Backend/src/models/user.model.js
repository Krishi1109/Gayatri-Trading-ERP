import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your username!"],
      unique: [true, "Opps, Email must be unique!"],
    },
    password: {
      type: String,
      required: [true, "Please enter password to procced furthure!"],
      minLength: [6, "Opps, Password should have minimum 6 characters!"],
    },
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

// Like.... Middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    // this.cpassword = await bcrypt.hash(this.cpassword, 12)
    next();
  }
});

const user = new mongoose.model("User", userSchema);
export default user;
