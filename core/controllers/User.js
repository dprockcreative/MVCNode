/**
 *	User Class
 */

require('../lib/imports/Base');
require('../lib/imports/Object');

/**
 *	Inherit
 */
module.exports = function(app, req, res, action, isPost){

	/**
	 *	Create & Extend the Node
	 *	@ The Object must go first so that it can be extend Base below 
	 *	@ The Class Object acquires all the shared methods of the Base Class
	 */
	var user = (function(){
		console.log("User::constructor");

		return { 
			list: function(cb) {
				console.log("user::list");
				var sql = (this.group_name) ? {where:{group_name:this.group_name}}:null;
				if(sql){
					Groups.findAll(sql).on('success', function(groups) {
						Users.findAll({where:{group_id:groups[0].id}}).on('success', cb).on('failure', function(err){console.log("Users:findAll", err);});
					}).on('failure', function(err){console.log("Group:findAll", err);});
				}else{
					Users.findAll().on('success', cb).on('failure', function(err){console.log("Users:findAll", err);});
				}
			},
			show: function(cb) {
				console.log("user::show", this.getParams().id);
				Users.find(Number(this.getParams().id)).on('success', cb).on('failure', function(err){console.log("Users:find failed", err);});
				return this;
			},
			save: function(cb){
				Users.find(Number(this.getParams().id)).on('success', function(u){
					if(u){
						u.updateAttributes(req.body).success(function(results) {
							console.log("user::saved");
							cb(results);
						});
					}
				});
				return this;
			}
		};
	}());

	user.extends(new Base()).compileParams(req.params);

	/**
	 *	Actions
	 *	@ The Class Object acquires all the shared methods of the Base Class
	 */
	console.log("User::action", action);

	switch(action){
		case 'list':
			user.list(function(results){

				user.setTitle("Users List").setResults(results).setQuery();

				var l = results.length-1;

				results.forEach(function(result, i, results){

					result.getGroup().on('success', function(group){

						user.addSubQuery('group', group, i);

						if(i>=l){
							res.render('user/list', user.collect());
						}
					});
				});
			});
			break;
		case 'show':
			user.show(function(results){

				user.setTitle("User Profile").setResults(results).setQuery();

				results.getGroup().on('success', function(group){

					user.addSubQuery('group', group);

					res.render('user/show', user.collect());
				});
			});
			break;
		case 'edit':
			user.show(function(results){
				isPost = isPost||false;
				var display = function(results) {
					user.setTitle("Edit Profile").setResults(results).setQuery();
					results.getGroup().on('success', function(group){	
						user.addSubQuery('group', group);
						res.render('user/edit', user.collect());
					});
				};

				if(isPost){
					console.log('posting');
					user.save(display);
				} else {
					display(results);			
				}
			});
			break;
		default:
			console.log("User default action");
			break;
	};

};
// END