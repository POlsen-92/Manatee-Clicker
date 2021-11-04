const express = require('express');
const router = express.Router();

// http://localhost:3000/sessions

router.get('/',(req,res)=>{
    res.json(req.session);
})

module.exports = router;