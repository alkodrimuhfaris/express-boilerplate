const router = require("express").Router();

const auth = require("../controllers/auth");

router.post("/login", auth.loginController);
router.post("/signup", auth.signupController);

module.exports = router;
