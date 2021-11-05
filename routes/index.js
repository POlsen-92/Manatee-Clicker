const express = require('express');
const router = express.Router();

//connecting routes responsible for displaying our front end
const frontEndRoutes = require("./frontend-routes.js");
router.use(frontEndRoutes);

//connecting routes responsible for accessing api data
const apiRoutes = require("./api");
router.use("/api",apiRoutes);

//connecting routes responsible for accessing user sessions
const sessionRoutes = require("./sessions-routes")
router.use("/sessions",sessionRoutes)

module.exports = router;