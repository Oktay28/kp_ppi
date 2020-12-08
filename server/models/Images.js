module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("Images", {
        url: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "images"
    })

    Images.associate = (models) => {
        Images.belongsTo(models.Products, {
            foreignKey: "product_id"
        })
    }

    return Images;
}