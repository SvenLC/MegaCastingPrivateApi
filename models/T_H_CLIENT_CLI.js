/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_H_CLIENT_CLI', {
		PRO_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'T_E_PROSPECT_PRO',
				key: 'PRO_ID'
			}			
		},
		CLI_SIRET: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		CLI_RNA: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		JUR_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		ADR_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		}
	}, {
		timestamps: false,
		tableName: 'T_H_CLIENT_CLI'
	});
};
