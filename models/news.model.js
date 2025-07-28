module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('news', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        },
        layout: {
            type: DataTypes.JSON,
        }

    });

    return News;
};
