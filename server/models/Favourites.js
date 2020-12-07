module.exports = (sequelize, DataTypes) => {
    const Favourites = sequelize.define("Favourites", {}, {
        tableName: "favourites"
    })

    Favourites.associate = (models) => {
        Favourites.belongsTo(models.Products, {
            foreignKey: "product_id"
        })

        Favourites.belongsTo(models.User, {
            foreignKey: "user_id"
        })
    }

    return Favourites;
}