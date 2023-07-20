const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const cookie = require("cookie");
//models
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username  is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "password length should be 6 character long"],
  },
  customerId: {
    type: String,
    default: "",
  },
});

//hased password
// pre means save hone se phele  hased code ka function excute hoga
//when next function called then our schema save
userSchema.pre("save", async function (next) {
  //update
  if (!this.isModified("password")) {
    //if the password  is  not modified then we call next ()
    next();
  }
  /*Password salting adds a random string (the salt) to a password before hashing it. 
  This way, the hash generated will always be different each time.
  */
  /* BCrypt Algorithm is used to hash and salt passwords securely. BCrypt permits building a password security*/
  //genSalt is function
  const salt = await bcrypt.genSalt(10);
  //hash the password
  this.password = await bcrypt.hash(this.password, salt);
  //when the password will hase then next() function excute again
  next();
});

//match password
//recive the argument password
//matchPassword is method which is created by me
userSchema.methods.matchPassword = async function (password) {
  //compare is built  in method which  is compare the user password
  return await bcrypt.compare(password, this.password);
};
//SIGN TOKEN
//generate token

//recieve  the response  in this  function

//SIGN TOKEN
userSchema.methods.getSignedToken = function (res) {
  const acccesToken = JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREIN,
  });
  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXIPREIN }
  );
  //generate token
  res.cookie("refreshToken", `${refreshToken}`, {
    maxAge: 86400 * 7000,
    httpOnly: true,
  });
};
const User = mongoose.model("User", userSchema);
module.exports = User;
