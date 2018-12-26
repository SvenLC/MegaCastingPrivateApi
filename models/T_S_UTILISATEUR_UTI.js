/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_S_UTILISATEUR_UTI', {				
		UTI_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		UTI_NOM: {
			type: DataTypes.STRING,
			allowNull: false
		},
		UTI_PRENOM: {
			type: DataTypes.STRING,
			allowNull: false
		},
		UTI_LOGIN: {
			type: DataTypes.STRING,
			allowNull: false
		},
		UTI_MDP: {
			type: DataTypes.STRING,
			allowNull: false
		},
		UTI_ADMINISTRATEUR: {
			type: DataTypes.BOOLEAN,
			allowNull: false,			
		}
	}, {
		timestamps: false,
		tableName: 'T_S_UTILISATEUR_UTI'
	});
};
