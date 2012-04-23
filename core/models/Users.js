/**
 * ORM Model
 * @ http://sequelizejs.com/?active=usage#usage
 */

module.exports = function(ORM, DataTypes) {
	return ORM.define("users", {
		id: { type: orm.INTEGER, autoIncrement: true },
		group_id: { type: orm.INTEGER, allowNull: false, defaultValue: 1 },
		user_name: { type: orm.STRING, allowNull: true },
		screen_name: {type: orm.STRING, allowNull: true },
		active: { type: orm.BOOLEAN, allowNull: false, defaultValue: false }
	}, {underscored: true});
};

console.log("Users::model");