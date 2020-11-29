module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "category"
    })

    Category.associate = (models) => {
        Category.hasMany(models.Products, {
            foreignKey: "category_id"
        })
    }

    return Category;
}