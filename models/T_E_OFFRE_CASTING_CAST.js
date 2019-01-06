/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('T_E_OFFRE_CASTING_CAST', {
		CAST_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		CAST_DUREE_DIFFUSION: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		CAST_DATE_DEBUT_CONTRAT: {
			type: DataTypes.DATEONLY,
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
			references: {
				model: 'T_E_PROSPECT_PRO',
				key: 'PRO_ID'
			}
		},
		MET_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'T_R_METIER_MET',
				key: 'MET_ID'
			}
		},
		CTC_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'T_E_CONTACT_CTC',
				key: 'CTC_ID'
			}
		},
		LOC_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'T_R_LOCALISATION_LOC',
				key: 'LOC_ID'
			}
		},
		CON_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'T_R_CONTRAT_CON',
				key: 'CON_ID'
			}
		}

	}, {
			timestamps: false,
			tableName: 'T_E_OFFRE_CASTING_CAST'

		});
};
