module.exports = (sequelize, DataTypes) => {
    const OrderedProducts = sequelize.define("OrderedProducts", {}, {
        tableName: "ordered_products"
    })

    return OrderedProducts;
}