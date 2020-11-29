module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
        address: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.FLOAT
        }
    }, {
        tableName: "orders"
    })

    Orders.associate = (models) => {
        Orders.belongsTo(models.User, {
            foreignKey: "user_id"
        })

        Orders.belongsToMany(models.Products, {
            foreignKey: "order_id",
            through: models.OrderedProducts
        })
    }

    return Orders;
}