/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_R_LOCALISATION_LOC', {
		LOC_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		LOC_LIBELLE: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		tableName: 'T_R_LOCALISATION_LOC'
	});
};
