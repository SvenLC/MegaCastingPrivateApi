/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_J_PROPOSE_PRO', {
		CON_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		CAST_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		}
	}, {
		tableName: 'T_J_PROPOSE_PRO'
	});
};
