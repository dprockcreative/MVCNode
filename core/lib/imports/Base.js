/**
 * Base
 * ------------------------------
 * Base Class for all classes that output to the view.
 */
Base = (function(){
    function Base(){
        var title = CONFIG.site.title, 
            params = new Object(),
            query = new Object(),
            results = new Object();

        return {
            getTitle   : function(){ return title; },
            setTitle   : function(s){ title = (typeof s === 'string')? (CONFIG.appendTitles)? CONFIG.site.title+' :: '+s:s:'';return this; },
            getParams  : function(){ return params; },
            setParams  : function(o){ params = (typeof o === 'object')? o:{};return this; },
            getResults : function(){ return results; },
            setResults : function(o){ results = (typeof o === 'object')? o:{};return this; },
            getQuery   : function(){ return query; },
            setQuery   : function(){ 
                var obj = this.getResults();
                if(typeof obj === 'object'){
                    this.queryReset();
                    if(!obj.length){obj=new Array(obj);}
                    var row,i,aLen=obj.length,atts=obj[0].attributes,j,bLen=atts.length;
                    for(i = 0; i < aLen; i++){
                        row = {};
                        for(j = 0; j < bLen; j++){
                            row[atts[j]] = obj[i][atts[j]];
                        }
                        query.rows.push(row);
                    }
                    if(query.rows.length){query.row = query.rows[0];}
                }
                return this; 
            },
            addSubQuery: function(element, obj, iterator){
                iterator = iterator||0;
                var key,row={},atts=obj.attributes,i,len=atts.length;
                for(i = 0; i < len; i++){
                    row[atts[i]] = obj[atts[i]];
                }
                query.rows[iterator][element] = row;
                if(!iterator){
                    query.row = query.rows[0];
                }
                return this;
            },
            queryReset : function(){ query={rows:Array(),row:Object()};return this; },
            collect : function() {
                return { 
                    title   : title,
                    params  : params,
                    results : results,
                    query   : query
                };
            },
            compileParams : function(params) {
                var obj = new Object();
                for(var key in params){obj[key] = params[key];}
                this.setParams(obj);
                return this;
            }
        };
    }
    return Base;
}());