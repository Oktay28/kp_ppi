module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        name: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.FLOAT
        },
        old_price: {
            type: DataTypes.FLOAT
        }
    }, {
        tableName: "products"
    })

    Products.associate = (models) => {
        Products.belongsTo(models.Category, {
            foreignKey: "category_id"
        })

        Products.belongsToMany(models.Orders, {
            foreignKey: "product_id",
            through: models.OrderedProducts
        })
    }

    return Products;
}