/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_E_PROSPECT_PRO', {
		PRO_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		PRO_NAME: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		timestamps: false,
		tableName: 'T_E_PROSPECT_PRO'
	});
};
