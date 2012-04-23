/**
 *	Object
 *	------------------------------
 *	Extends native Object.
 */
Object.defineProperty(Object.prototype, "extends", {
	enumerable: false,
	value: function(from) {				
		var props = Object.getOwnPropertyNames(from);
		var dest = this;
		props.forEach(function(name){
			var destination = Object.getOwnPropertyDescriptor(from, name);	
			Object.defineProperty(dest, name, destination);
		});
		return this;
	}
});

Object.defineProperty(Object.prototype, "hasValue", {value: function(needle,strict) {for(var key in this){if(strict){if(needle === this[key]){return true;}}else{if(needle == this[key]){return true;}}}return false;}});
