/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_R_DOMAINE_METIER_DOM', {
		DOM_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		DOM_LIBELLE: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'T_R_DOMAINE_METIER_DOM'
	});
};
