const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const Auth = require('../middleware/verifyToken')


router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", userController.logout);
router.post("/refresh", userController.refreshToken);

router.get("/getalluser", Auth, userController.getAllUser);
router.delete("/getalluser/:Id", Auth, userController.deleteUser);

// router.put("/update", Auth, userController.update);


module.exports = router;