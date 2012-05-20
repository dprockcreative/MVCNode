/**
 *    Dispatcher
 *    ------------------------------
 *    Handles output to the View.
 */
Dispatcher = module.exports = function(){
    const INDEX_PAGE = 'index';
    var res = Object(), 
        req = Object(),
        page = String();

    return {
        init : function(req, res, page) {
            //console.dir(req);
            this.setRequest(req).setResponse(res).setPage(page);
        },
        render : function() {
            res.render(this.getPage(), this.getRequest().params);
        },
        setRequest  : function(o){ req = (typeof o === 'object')?o:{};return this; },
        getRequest  : function(){ return req; },
        setResponse : function(o){ res = (typeof o === 'object')?o:{};return this; },
        getResponse : function(){ return res; },
        setPage     : function(s){ page = (typeof s === 'string')?s:INDEX_PAGE;return this; },
        getPage     : function(){ return page; }
    };
}();