const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../model/user.model");

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const presentuser = await Usermodel.findOne({ email });
    if (presentuser) {
      bcrypt.compare(password, presentuser.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: presentuser._id }, "masai");

          res.send({ msg: "login succesfully", token });
        } else {
          res.send("wrong credentials");
        }
      });
    }
    else {

        res.send("wrong")
    }
  } catch (err) {
    res.send({ err: err });
  }
});
userRouter.post("/resistor", (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
        res.send("resistor faild")
      } else {
        const user = new Usermodel({
          name,
          password: secure_password,
          gender,
          email,
        });
        await user.save();
        res.send("resistered succesfully");
      }
    });
  } catch (err) {
    res.send("err while resistering the user");
  }
});
module.exports = { userRouter };
