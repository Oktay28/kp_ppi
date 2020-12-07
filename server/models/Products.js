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
        },
        is_featured: {
            type: DataTypes.BOOLEAN
        },
        short_text: {
            type: DataTypes.STRING,
            allowNull: true
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

        Products.hasMany(models.Favourites, {
            foreignKey: "product_id"
        })
    }


    return Products;
}