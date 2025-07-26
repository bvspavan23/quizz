const express = require("express");
const submitcontroller = require("../controllers/SubmitCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const SubmitRouter = express.Router();
SubmitRouter.get("/api/v1/join/:id",submitcontroller.getjoinbyId);
SubmitRouter.post("/api/v1/submit-quiz",submitcontroller.submit);
module.exports = SubmitRouter;