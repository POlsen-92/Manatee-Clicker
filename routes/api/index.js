const router = require('express').Router();
const userRoutes = require('./user-routes');
const manateeRoutes = require('./manatee-routes');

// http://localhost:3000/api/

router.use('/users', userRoutes);
router.use('/manatees', manateeRoutes);


module.exports = router;