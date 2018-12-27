/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_X_CODE_POSTAL_CPT', {
		CPT_COMMUNE: {
			type: DataTypes.STRING,
			allowNull: true
		},
		CPT_CODEPOST: {
			type: DataTypes.STRING,
			allowNull: true
		},
		CPT_DEPARTEMENT: {
			type: DataTypes.STRING,
			allowNull: true
		},
		CPT_INSEE: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true
		}
	}, {
		timestamps: false,
		tableName: 'T_X_CODE_POSTAL_CPT'
	});
};
