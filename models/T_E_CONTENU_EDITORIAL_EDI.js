/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_E_CONTENU_EDITORIAL_EDI', {
		EDI_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		EDI_DESCRIPTION: {
			type: DataTypes.STRING,
			allowNull: false
		},
		EDI_CONTENU: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		CET_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		}
	}, {
		tableName: 'T_E_CONTENU_EDITORIAL_EDI'
	});
};
