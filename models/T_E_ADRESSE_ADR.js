/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_E_ADRESSE_ADR', {
		ADR_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		ADR_NUM_VOIE: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ADR_LIBELLE_RUE: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ADR_VILLE: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		tableName: 'T_E_ADRESSE_ADR'
	});
};
