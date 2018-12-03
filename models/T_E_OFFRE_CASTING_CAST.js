/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('T_E_OFFRE_CASTING_CAST', {
		CAST_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		CAST_INTITULE: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CAST_REFERENCE: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CAST_DATE_DEBUT_PUBLICATION: {
			type: DataTypes.DATE,
			allowNull: false
		},
		CAST_DUREE_DIFFUSION: {
			type: DataTypes.TIME,
			allowNull: false
		},
		CAST_DATE_DEBUT_CONTRAT: {
			type: DataTypes.DATE,
			allowNull: false
		},
		CAST_NBR_POSTE: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		CAST_DESCRIPTION_POSTE: {
			type: DataTypes.STRING,
			allowNull: false
		},
		CAST_DESCRIPTION_PROFIL: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PRO_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		MET_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		}
	}, {
		timestamps: false,
		tableName: 'T_E_OFFRE_CASTING_CAST'
	});
};