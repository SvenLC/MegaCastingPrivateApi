const Sequelize = require('sequelize');

const sequelize = new Sequelize('MEGACASTING', 'adminmegacasting', 't4tX38CwrHQJbDWkl2qr', {
    host: 'megacasting.database.windows.net',
    dialect:'mssql',
    dialectOptions: {
      encrypt: true,    
      },
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  module.exports = sequelize;