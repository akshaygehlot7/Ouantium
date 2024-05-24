const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name Should have more then 4  characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  dateofBirth: {
    type: Date,
    required: [true, "Please Enter Your Date of Birth"],
  },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
});

// hash password  
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // JWT TOKEN
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
      expiresIn: process.env.JWT_EXPIRES_TIME
    });
  };
  
  // Compare Password
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
module.exports = mongoose.model("User", userSchema);
