const express = require('express');

const router = express.Router()

// main route - server informations
router.get('/api/v1', function(req,res){
    res.status(200).json({
        message :'Node.js API with Express version 1.0.0',
        localHour:Math.floor(Date.now()/1000),
        Date : new Date().toDateString(),
        Author : 'Magali Jouan',
        Documentation : '/api/v1/docs'
    });
});

module.exports = router;