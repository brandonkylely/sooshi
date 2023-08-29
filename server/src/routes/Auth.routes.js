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
router.post("/upload", 
// jwtAuth.authenticateToken,
PhotoUtils.upload.single("image"),
authController.upload);

// GET - /api/auth/getSushiFeed for getting the list of sushi posts
router.get("/getSushiFeed", authController.getSushiFeed);

// GET - /api/auth/getSushiURL for getting the signed URL of the photo
router.get("/getSushiURL", authController.getSushiURL);

module.exports = router;