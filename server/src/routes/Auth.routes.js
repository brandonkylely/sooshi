const router = require("express").Router()
const authController = require("../controllers/Auth.controller")
const jwtAuth = require('../utils/JWTauth')

// POST - /api/auth/register
router.post('/register', authController.register)

// POST - /api/auth/login
router.post('/login', authController.login)

// PROTECTED ROUTE - ALL /api/auth/post
router.all('/post', jwtAuth.authenticateToken, authController.protected)

// PROTECTED ROUTE - ALL /api/auth/delete
// router.all('/delete', jwtAuth.authenticateToken, authController.protected)


module.exports = router;