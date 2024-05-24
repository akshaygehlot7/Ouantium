// exports.getProduct = (req, res)=>{
//     res.status(200).json({message: "Route is working fine"})
// }

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, dateofBirth } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      dateofBirth,
    });
    const token = user.getJWTToken();

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  //   check password correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const token = user.getJWTToken();
  // Set the token as a cookie in the response
  res.cookie("token", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ), // Cookie expiration time
    httpOnly: true, // Cookie is accessible only via HTTP(S)
    secure: req.secure || req.headers["x-forwarded-proto"] === "https", // Secure cookie for production
  });
  res.status(201).json({
    success: true,
    user,
    token,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
