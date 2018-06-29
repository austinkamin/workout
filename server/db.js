const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('workout', 'postgres', process.env.PGPASS, {
    dialect: 'postgres'
})

sequelize.authenticate()
    .then(() => console.log('postgres database is connected!'))
    .catch(err => console.log(err))

sequelize.sync();
module.exports = sequelize;