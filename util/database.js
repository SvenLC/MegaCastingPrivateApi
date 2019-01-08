const Sequelize = require('sequelize');

const login = process.env.SQLCONNSTR_login;
const mdp = process.env.SQLCONNSTR_mdp;
const dataBase = process.env.SQLCONNSTR_dataBase;

const sequelize = new Sequelize(dataBase, login, mdp, {
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
