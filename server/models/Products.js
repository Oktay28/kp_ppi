module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        name: {
            type: DataTypes.STRING
        }
    })

    return Products;
}