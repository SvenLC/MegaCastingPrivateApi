/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_R_METIER_MET', {
		MET_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
		timestamps: false,
		tableName: 'T_R_METIER_MET'
	});
};
