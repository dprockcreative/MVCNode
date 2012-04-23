module.exports = function(app){

	/**
	 *	Static Routes
	 */
	app.get('*.css', function(req, res) {
		var path = __dirname + req.url;
		console.log('CSS Compression: '+path);
		fs.readFile(path, "utf8", function(err, data) {
			if (err) throw err;
			less.render(data, function(err, css) {
				if (err) throw err;
				res.header("Content-type", "text/css");
				res.send(css);
			});
		});
	});

	/**
	 *	Index
	 */
	app.get('/', function(req, res){
		var obj = CONFIG.site;
		//console.dir(obj);
		obj.title = obj.name;
		obj.content = "Home Page Content";
		res.render('index', obj);
	});

	/**
	 *	User
	 */
	app.get('/users', function(req, res){
		require('./controllers/User')(app, req, res, 'list');
	});

	app.get('/users/:group_name', function(req, res){
		require('./controllers/User')(app, req, res, 'list');
	});

	app.get('/user/:id', function(req, res){
		require('./controllers/User')(app, req, res, 'show');
	});

	app.get('/user/edit/:id', function(req, res){
		require('./controllers/User')(app, req, res, 'edit');
	});
	app.post('/user/edit/:id', function(req, res){
		require('./controllers/User')(app, req, res, 'edit', true);
	});

};
