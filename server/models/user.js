module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        // first_name: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // last_name: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                // isUsername: true
            }
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
return User; 
}
