const	bcrypt	=	require('bcrypt');
const	{	DataTypes	}	=	require('sequelize');
module.exports	=	(app)	=>	{
		const	Users	=	app.db.define('Users',	{
				//	Os	demais	campos	desse	modelo	foram	criados	no	capítulo	5
				password:	{
						type:	DataTypes.STRING,
						allowNull:	false,
						validate:	{
								notEmpty:	true
						},
						set(value)	{
								const	salt	=	bcrypt.genSaltSync();
								const	password	=	bcrypt.hashSync(value,	salt);
								this.setDataValue('password',	password);
						}
				}
		});
		return	Users;
};