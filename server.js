const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');
const newsRoutes = require('./routes/news.routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: 'https://www.anphatlaichau.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

app.use('/news', newsRoutes);

sequelize.sync().then(() => {
    console.log('Database synced');
});



app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});