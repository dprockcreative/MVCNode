/**
 *	Dependencies
 	//io 		= require('socket.io'), 
 */
CONFIG = require('./config');
//console.dir(process.env);

var connect = require('connect'), 
	express = require('express')
	less 	= require('less'), 
	fs      = require('fs'),
	orm     = require('sequelize'),
	port 	= CONFIG.port[process.env.NODE_ENV];

var app = express.createServer();

/**
 *	Configure
 */
app.configure('development', function(){
	app.use(express.logger());
	app.use(express.errorHandler({dumpExceptions:true, showStack:true}));
});

app.configure('production', function(){
	app.use(express.logger());
	app.use(express.errorHandler());
});

/**
 *	Configure
 */
app.set('view engine', 'htm');
app.register('.htm', require('ejs'));
app.set('view options', {layout:true,open:'{{',close:'}}'});
app.set('views', __dirname + '/views');
app.use(connect.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:CONFIG.session.key}));
app.use(connect.favicon(__dirname + '/static/images/favicon.ico'));
app.use(connect.static(__dirname + '/static'));
app.use(app.router);


/**
 *	Errors
 */
app.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404', {locals:{title:'404 - Not Found', description:'', author:'', analytics:CONFIG.site.analytics.id}, status:404});
    } else {
        res.render('500', {locals:{title:'The Server Encountered an Error', description:'', author:'', analytics:CONFIG.site.analytics.id,error:err }, status:500});
    }
});

app.listen(port);
console.log('Listening on ' + port);

/**
 *	Database
 */
var db = CONFIG.db[process.env.NODE_ENV];
ORM = new orm(db.database, db.user, db.pw, {host:db.host,port:db.port,logging:db.logging});

/**
 *	Models
 */
require('./models/index');

/**
 *	Routes
 */
require('./routes')(app);

/**
 *	A Route for Creating a 500 Error (Useful to keep around)
 */
app.get('/500', function(req, res){
	throw new Error('This is a 500 Error');
});

/**
 *	The 404 Route [KEEP AS LAST ROUTE]
 */
app.get('/*', function(req, res){
	throw new NotFound;
});
	
/**
 *	Housecleaning
 */
function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
