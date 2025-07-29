const express = require('express');
const router = express.Router();
const { createNews, getAllNews, getNewsById } = require('../controllers/newsController')

router.get('/', getAllNews);
router.post('/', createNews);
router.get('/:id', getNewsById);


module.exports = router;
