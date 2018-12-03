/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_S_DATABASE_INFO_DBI', {
		DBI_LIBELLE: {
			type: DataTypes.STRING,
			allowNull: false
		},
		DBI_TYPE: {
			type: DataTypes.STRING,
			allowNull: false
		},
		DBI_VALEUR: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'T_S_DATABASE_INFO_DBI'
	});
};
