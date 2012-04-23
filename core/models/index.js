/**
 *	Boostraps the Models
 */
var CREATE_TABLES 	= false;
var PURGE 			= false;

/**
 *	Models
 */
Groups = ORM.import(__dirname + '/Groups');
Users  = ORM.import(__dirname + '/Users');


/**
 *	Associations
 */
Groups.hasMany(Users, {as:'users',foreignKey:'group_id'});
Users.belongsTo(Groups);


/**
 * Globally Sync Tables
 */
ORM.sync({force:PURGE}).on('success', function(){
	console.log('ORM::sync');

	/**
	 * this must be handled manually
	 */
	if(CREATE_TABLES){
		Groups.create().on('success', function(groups) {
			console.log('ORM::Groups:create');
			Users.create({group_id:groups.id}).on('success', function(result) {
				console.log('ORM::Users:create', result);
				result.setGroup().on('success', function(groups) {
					console.log('ORM::result:setGroup');
					console.log(result);
					console.log(groups);
				}).on('failure', function(err){
					console.log("ORM::result:setGroup fail:", err);
				});
			}).on('failure', function(err){
				console.log("ORM::Users:sync fail:", err);
			});
		}).on('failure', function(err){
			console.log("ORM::Groups:sync fail:", err);
		});
	}
}).on('failure', function(err){
	console.log("ORM::sync fail:", err);
});