/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_R_STATUT_JURIDIQUE_JUR', {
		JUR_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		JUR_LIBELLE: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'T_R_STATUT_JURIDIQUE_JUR'
	});
};
