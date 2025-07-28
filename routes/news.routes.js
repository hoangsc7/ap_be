const express = require('express');
const router = express.Router();
const db = require('../models');
const News = db.news;

// Thêm new
router.post('/news', async (req, res) => {
    try {
        const news = await News.create(req.body);
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy danh sách user
// router.get('/news', async (req, res) => {
//     try {
//         const news = await News.findAll();
//         res.json(news);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

router.get('/api/news', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // mặc định trang 1
    const limit = parseInt(req.query.limit) || 11; // mặc định 5 item
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await News.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', "DESC"]],
        });

        res.json({
            data: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
