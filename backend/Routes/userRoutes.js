const express = require("express")
const { registerUser, loginUser, getAllUser } = require("../controllers/userController")

const router = express.Router() 

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/allUser").get(getAllUser)

module.exports = router