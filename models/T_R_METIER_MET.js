/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_R_METIER_MET', {
		MET_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		MET_LIBELLE: {
			type: DataTypes.STRING,
			allowNull: false
		},
		DOM_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		}
	}, {
		tableName: 'T_R_METIER_MET'
	});
};
