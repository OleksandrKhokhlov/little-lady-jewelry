const express = require('express');

const router = express.Router();

const { cron } = require('../controllers/cron-job');

router.get('/ping', cron);

module.exports = router;