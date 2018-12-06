/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_E_CONTACT_CTC', {
		CTC_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		CTC_DESCRIPTION: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CTC_NUM_TEL: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CTC_NUM_FAX: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CTC_EMAIL: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CTC_PRINCIPALE: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		PRO_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		}
	}, {
		timestamps: false,
		tableName: 'T_E_CONTACT_CTC'
	});
};
