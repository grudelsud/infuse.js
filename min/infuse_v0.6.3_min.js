/* infuse.js - v0.6.3 - 2013-05-10 - https://github.com/soundstep/infuse.js - http://www.soundstep.com */(function(){"use strict";var t={version:"0.6.3"},r=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,n=/,/,e=/^\s*(_?)(\S+?)\1\s*$/,i=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;Array.prototype.contains||(Array.prototype.contains=function(t){for(var r=this.length;r--;)if(this[r]===t)return!0;return!1}),t.InjectorError={MAPPING_BAD_PROP:"[Error infuse.Injector.mapClass/mapValue] the first parameter is invalid, a string is expected",MAPPING_BAD_VALUE:"[Error infuse.Injector.mapClass/mapValue] the second parameter is invalid, it can't null or undefined, with property: ",MAPPING_BAD_CLASS:"[Error infuse.Injector.mapClass/mapValue] the second parameter is invalid, a function is expected, with property: ",MAPPING_BAD_SINGLETON:"[Error infuse.Injector.mapClass] the third parameter is invalid, a boolean is expected, with property: ",MAPPING_ALREADY_EXISTS:"[Error infuse.Injector.mapClass/mapValue] this mapping already exists, with property: ",CREATE_INSTANCE_INVALID_PARAM:"[Error infuse.Injector.createInstance] invalid parameter, a function is expected",NO_MAPPING_FOUND:"[Error infuse.Injector.getInstance] no mapping found",INJECT_INSTANCE_IN_ITSELF_PROPERTY:"[Error infuse.Injector.getInjectedValue] A matching property has been found in the target, you can't inject an instance in itself",INJECT_INSTANCE_IN_ITSELF_CONSTRUCTOR:"[Error infuse.Injector.getInjectedValue] A matching constructor parameter has been found in the target, you can't inject an instance in itself"};var a=function(t,r,n,e){this.prop=t,this.value=r,this.cl=n,this.singleton=e||!1},o=function(r){if("string"!=typeof r)throw Error(t.InjectorError.MAPPING_BAD_PROP)},s=function(r,n){if(void 0===n||null===n)throw Error(t.InjectorError.MAPPING_BAD_VALUE+r)},p=function(r,n){if("function"!=typeof n)throw Error(t.InjectorError.MAPPING_BAD_CLASS+r)},u=function(r,n){if("boolean"!=typeof n)throw Error(t.InjectorError.MAPPING_BAD_SINGLETON+r)},c=function(r,n){var e=t.getConstructorParams(n);if(e.contains(r))throw Error(t.InjectorError.INJECT_INSTANCE_IN_ITSELF_CONSTRUCTOR)},l=function(r,n){if(n.hasOwnProperty(r))throw Error(t.InjectorError.INJECT_INSTANCE_IN_ITSELF_PROPERTY)};t.Injector=function(){this.mappings={},this.parent=null},t.getConstructorParams=function(t){function a(t,r,n){o.push(n)}for(var o=[],s=(""+t).replace(i,""),p=s.match(r),u=p[1].split(n),c=0;u.length>c;c++){var l=u[c];l.replace(e,a)}return o},t.Injector.prototype={createChild:function(){var r=new t.Injector;return r.parent=this,r},getMappingVo:function(t){return this.mappings?this.mappings[t]?this.mappings[t]:this.parent?this.parent.getMappingVo(t):null:null},mapValue:function(r,n){if(this.mappings[r])throw Error(t.InjectorError.MAPPING_ALREADY_EXISTS+r);return o(r),s(r,n),this.mappings[r]=new a(r,n,void 0,void 0),this},mapClass:function(r,n,e){if(this.mappings[r])throw Error(t.InjectorError.MAPPING_ALREADY_EXISTS+r);return o(r),p(r,n),e&&u(r,e),this.mappings[r]=new a(r,null,n,e),this},removeMapping:function(t){return this.mappings[t]=null,delete this.mappings[t],this},hasMapping:function(t){return!!this.mappings[t]},hasInheritedMapping:function(t){return!!this.getMappingVo(t)},getMapping:function(t){for(var r in this.mappings)if(this.mappings.hasOwnProperty(r)){var n=this.mappings[r];if(n.value===t||n.cl===t)return n.prop}return void 0},getValue:function(r){var n=this.mappings[r];if(!n){if(this.parent)return this.parent.getValue.apply(this.parent,arguments);throw Error(t.InjectorError.NO_MAPPING_FOUND)}if(n.cl){var e=Array.prototype.slice.call(arguments);return e[0]=n.cl,this.getValueFromClass.apply(this,e)}return n.value},getClass:function(t){var r=this.mappings[t];return r?r.cl?r.cl:void 0:this.parent?this.parent.getClass(t):void 0},instantiate:function(r){if("function"!=typeof r)throw Error(t.InjectorError.CREATE_INSTANCE_INVALID_PARAM);for(var n=[null],e=t.getConstructorParams(r),i=0;e.length>i;i++)if(void 0!==arguments[i+1]&&null!==arguments[i+1])n.push(arguments[i+1]);else{var a=e[i],o=this.getMappingVo(a);if(o){var s=this.getInjectedValue(o,a);n.push(s)}else n.push(void 0)}return new(Function.prototype.bind.apply(r,n))},inject:function(t,r){this.parent&&this.parent.inject(t,!0);for(var n in this.mappings)if(this.mappings.hasOwnProperty(n)){var e=this.getMappingVo(n);t.hasOwnProperty(e.prop)&&(t[n]=this.getInjectedValue(e,n))}return"function"!=typeof t.postConstruct||r||t.postConstruct(),this},getInjectedValue:function(t,r){var n,e=t.value;return t.cl&&(t.singleton?(t.value||(c(r,t.cl),t.value=this.instantiate(t.cl),n=t.value),e=t.value):(c(r,t.cl),e=this.instantiate(t.cl),n=e)),n&&(l(r,n),this.inject(n)),e},createInstance:function(){var t=this.instantiate.apply(this,arguments);return this.inject(t),t},getValueFromClass:function(r){for(var n in this.mappings)if(this.mappings.hasOwnProperty(n)){var e=this.mappings[n];if(e.cl===r)return e.singleton?(e.value||(e.value=this.createInstance.apply(this,arguments)),e.value):this.createInstance.apply(this,arguments)}if(this.parent)return this.parent.getValueFromClass.apply(this.parent,arguments);throw Error(t.InjectorError.NO_MAPPING_FOUND)},dispose:function(){this.mappings={}}},Function.prototype.bind||(Function.prototype.bind=function(t){var r=this;if("function"!=typeof r)throw Error("Error, you must bind a function.");var n=Array.prototype.slice.call(arguments,1),e=function(){if(this instanceof e){var i=function(){};i.prototype=r.prototype;var a=new i,o=r.apply(a,n.concat(Array.prototype.slice.call(arguments)));return Object(o)===o?o:a}return r.apply(t,n.concat(Array.prototype.slice.call(arguments)))};return e}),"function"==typeof define&&define.amd!==void 0&&define("infuse",t),"undefined"!=typeof module&&module.exports!==void 0?module.exports=t:window.infuse=t})();