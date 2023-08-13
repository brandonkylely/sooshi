const router = require("express").Router()
const authController = require("../controllers/Auth.controller")
const PhotoUtils = require("../utils/PhotoUtils");
const jwtAuth = require('../utils/JWTauth')

// POST - /api/auth/register
router.post('/register', authController.register)

// POST - /api/auth/login
router.post('/login', authController.login)

// PROTECTED ROUTE - ALL /api/auth/protected
router.all('/protected', jwtAuth.authenticateToken, authController.protected)

// upload photo using key defined below in upload.single.id
router.post("/upload", jwtAuth.authenticateToken, PhotoUtils.upload.single("sushiImage"), authController.uploadPhoto);


module.exports = router;