const express = require('express');
const router = express.Router();
const { createNews, getAllNews, getNewsById, putNews, deleteNews } = require('../controllers/newsController')

router.get('/', getAllNews);
router.post('/', createNews);
router.get('/:id', getNewsById);
router.put('/:id', putNews);
router.delete('/:id', deleteNews);


module.exports = router;
