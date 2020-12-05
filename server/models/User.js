module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        birth_year: {
            type: DataTypes.DATE
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        cart_number: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "users"
    })

    User.associate = (models) => {
        User.hasMany(models.Orders, {
            foreignKey: "user_id"
        })

    }

    return User;
}