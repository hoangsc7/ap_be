const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');
const newsRoutes = require('./routes/news.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/news', newsRoutes);
app.use('/admin', adminRoutes);

sequelize.sync().then(() => {
    console.log('Database synced');
});



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});