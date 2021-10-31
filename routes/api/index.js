const router = require('express').Router();
const userRoutes = require('./user-routes');
const manateelevelRoutes = require('./level-routes');

// http://localhost:3000/api/

router.use('/users', userRoutes);
router.use('/manateelvl', manateelevelRoutes);


module.exports = router;