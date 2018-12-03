/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_R_CONTRAT_CON', {
		CON_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		CON_LIBELLE: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'T_R_CONTRAT_CON'
	});
};
