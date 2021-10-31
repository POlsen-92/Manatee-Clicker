const router = require('express').Router();
const userRoutes = require('./user-routes');
const manateelvlRoutes = require('./manateelvl-routes');

// http://localhost:3000/api/

router.use('/users', userRoutes);
router.use('/manateelvl', manateelvlRoutes);


module.exports = router;