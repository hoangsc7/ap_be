const News = require('../models/news.model')

const createNews = async (req, res) => {
    try {
        const news = await News.create(req.body);
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const getAllNews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 11;
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
        console.error('Error in createNews:', err);
        res.status(500).json({ message: 'Server error' });
    }
}
const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findByPk(id);

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.json(news);
    } catch (error) {
        console.error('Error fetching news by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const putNews = async (req, res) => {
    const { id } = req.params;
    const { title, img, content, json, html } = req.body;

    try {
        const news = await News.findByPk(id);
        if (!news) return res.status(404).json({ message: "News not found" });

        await news.update({ title, img, content, json, html });
        res.status(200).json({ message: "News updated successfully", news });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        const news = await News.findByPk(id);
        if (!news) return res.status(404).json({ message: "News not found" });

        await news.destroy();
        res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    putNews,
    deleteNews,
}