const express = require('express');
const app = express();
const db = require('./models');
const userRoutes = require('./routes/news.routes');
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(userRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running at http://localhost:3000');
    });
});