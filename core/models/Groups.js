/**
 * ORM Model
 * @ http://sequelizejs.com/?active=usage#usage
 */

module.exports = function(ORM, DataTypes) {
    return ORM.define("groups", {
        id: { type: orm.INTEGER, autoIncrement: true },
        group_name: { type: orm.STRING, allowNull: true },
        group_label: {type: orm.STRING, allowNull: true },
        group_label_short: {type: orm.STRING, allowNull: true },
        active: { type: orm.BOOLEAN, allowNull: false, defaultValue: false }
    }, {underscored: true});
    
};

console.log("Groups::model");