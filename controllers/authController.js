const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");
//to generate the token at registration time
//pass the user at registration time  and login time
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};
exports.sendToken = sendToken;
exports.registerController = async (req, res, next) => {
  try {
    console.log(next, "this is next");
    const { username, email, password } = req.body;
    //existing  user
    //await  for usermodel
    const exisitingEmail = await userModel.findOne({ email });
    if (exisitingEmail) {
      next(new errorResponse("email is already register", 500));
      return;
    }
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error, "error 6");
    next(error); //pass  as  middle  ware
  }
};
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    //res
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//LOGOUT
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};
