/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_R_LOCALISATION_LOC', {
		LOC_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		LOC_LIBELLE: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'T_R_LOCALISATION_LOC'
	});
};
