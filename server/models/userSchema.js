const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = new Schema({
  fullname : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String, 
    required: true
  },
  avatar : {
    type : String,
    default : ""
  },
  otp : {
    type : String,
    default : ""
  },
  isAccountVarified : {
    type: Boolean,
    default : false
  },
  otpExpiredAt : {
    type : Date
  },
  resetPass: {
    type : String
  },
  resetPassExpiredAt: {
    type : Date
  }
},
{
  timestamps : true
}
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error); 
  }
});


// compare the password
userSchema.methods.isPasswordValids = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("user", userSchema)