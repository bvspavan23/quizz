const express = require("express");
const adminsController = require("../controllers/AdminCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const adminRouter = express.Router();
// !Register
adminRouter.post("/api/v1/users/register", adminsController.register);
// ! Login
adminRouter.post("/api/v1/users/login",adminsController.login);
module.exports = adminRouter;