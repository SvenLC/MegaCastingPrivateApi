/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_H_PARTENAIRES_PAR', {
		PRO_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'T_E_PROSPECT_PRO',
				key: 'PRO_ID'
			}
		},
		PAR_LOGIN: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PAR_MDP: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		tableName: 'T_H_PARTENAIRES_PAR'
	});
};
