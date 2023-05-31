const express = require('express');
const authController = require('../controllers/auth.controller');
const auth = require('../middleWare/auth');
const router = express.Router();

/// api/auth/.....
router.post('/register',authController.register)
router.post('/signin',authController.signin)
router.get('/isauth',auth(),authController.isauth)







module.exports = router;