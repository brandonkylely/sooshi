const router = require('express').Router();
const authRoutes = require('./Auth.routes')

router.get('/', (req, res) => {
  res.send('Last Updated: 9/10/2023')
})

// Import Auth routes
router.use('/api/auth', authRoutes)

module.exports = router;