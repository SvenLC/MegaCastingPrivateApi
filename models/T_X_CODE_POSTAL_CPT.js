/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_X_CODE_POSTAL_CPT', {
		CPT_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		CPT_CODE_POSTAL: {
			type: DataTypes.CHAR,
			allowNull: false
		},
		CPT_VILLE: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		tableName: 'T_X_CODE_POSTAL_CPT'
	});
};
