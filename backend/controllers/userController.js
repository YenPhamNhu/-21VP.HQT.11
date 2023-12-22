// https://www.youtube.com/watch?v=ErK3Qt52a1M&ab_channel=EducationwithAnkur
"use strict";
const userData = require("../data/users");
const getAllUser = async (req, res, next) => {
  try {
    const userlist = await userData.getUser();
    res.send(userlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const userMap = {};

const getUserBySDT = async (req, res, next) => {
  try {
    const userlist = await userData.getUser();
    for (const user of userlist) {
      userMap[user.SDT] = user;
    }
    const userSDT = req.params.SDT;
    console.log("SDT:", userMap[userSDT]);
    const user = userMap[userSDT];

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    // console.log("deleteUser API is called");
    const userSDT = req.params.SDT; // Assuming userSDT is part of the URL parameters
    // Perform validation or additional checks if needed
    // console.log("Deleting patient with ID:", userSDT);
    const deletedUser = await userData.deleteUserBySDT(userSDT);
    console.log(deletedUser);

    res.send({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// const deleteAllUser = async (req, res, next) => {};
module.exports = {
  getAllUser,
  getUserBySDT,
  deleteUser,
  // deleteAllUser,
};
