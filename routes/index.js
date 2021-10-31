const express = require('express');
const router = express.Router();

// http://localhost:3000/

const frontEndRoutes = require("./frontend-routes.js");
router.use(frontEndRoutes);
const apiRoutes = require("./api");
router.use("/api",apiRoutes);
const sessionRoutes = require("./sessions-routes")
router.use("/sessions",sessionRoutes)

module.exports = router;