/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_R_CONTENU_EDITORIAL_TYPE_CET', {
		CET_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		CET_LIBELLE: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'T_R_CONTENU_EDITORIAL_TYPE_CET'
	});
};
