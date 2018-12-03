/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_S_DATABASE_ADMIN_DBA', {
		DBA_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		DBA_DATEHEURE: {
			type: DataTypes.DATE,
			allowNull: false
		},
		DBA_NOM: {
			type: DataTypes.STRING,
			allowNull: false
		},
		DBA_NATURE: {
			type: DataTypes.STRING,
			allowNull: false
		},
		DBA_COMMANDE: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'T_S_DATABASE_ADMIN_DBA'
	});
};
