module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("Images", {
        url: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "images"
    })

    return Images;
}