/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_J_SITUER_SIT', {
		LOC_ID: {
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
		tableName: 'T_J_SITUER_SIT'
	});
};
