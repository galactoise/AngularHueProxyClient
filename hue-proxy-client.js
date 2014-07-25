(function(){
	var app = angular.module('hueProxyClient',[]);
	
	/**
	 * Defined as a factory, in order to be injectable into other apps
	 */
	app.factory('hueProxyClientService',['$http','$log',function($http,$log){
		/**
		 * List of endpoints exposed by the API
		 */
		var LIGHTS_PATH = "/lights";
		var LIGHT_BY_ID_PATH = "/lights/%s";
		var TOGGLE_LIGHT_BY_ID_PATH = "/lights/%s/togglePower";
		var STROBE_LIGHT_BY_ID_PATH = "/lights/%s/ravetime";
		
		var serviceUri = null;
		
		var setServiceUri = function(serviceUri2){
			serviceUri = serviceUri2;
		};
		
		var getServiceUri = function(){
			return serviceUri;
		};
		
		var getLights = function(){
			$log.log("Getting basic lights info...");
			return $http.get(serviceUri + LIGHTS_PATH);
		};
		var getLightById = function(id){
			var url = serviceUri + LIGHT_BY_ID_PATH.replace(/%s/g,id);
			
			$log.log("Getting light with id = '" + id + "'...");
			return $http.get(url);
		};
		
		var updateLightById = function(id, state){
			var url = serviceUri + LIGHT_BY_ID_PATH.replace(/%s/g,id);
			$log.log("Updating light with id = '" + id + "'...");
			$log.log("Url: " + url);
			return $http.post(url, state);
		};
		
		/**
		 * Toggle (turn on or off) a light by its lightId
		 */
		var toggleLightById = function(id){
			var url = serviceUri + TOGGLE_LIGHT_BY_ID_PATH.replace(/%s/g,id);
			$log.log("Toggling on/off state of light with id = '" + id + "'...");
			return $http.put(url);
		};
		
		/**
		 * Trigger strobe functionality for a light by its lightId
		 */
		var strobeLightById = function(id){
			var url = serviceUri + STROBE_LIGHT_BY_ID_PATH.replace(/%s/g,id);
			$log.log("Toggling on/off state of light with id = '" + id + "'...");
			return $http.put(url);
		};
		
		return {
			getLights: function(){ return getLights();},
			getLightById: function(id) { return getLightById(id);},
			updateLightById: function(id,state) { return updateLightById(id,state);},
			getServiceUri: function(){ return getServiceUri(); },
			setServiceUri: function(serviceUri){ setServiceUri(serviceUri); },
			toggleLightById: function(id){ return toggleLightById(id);},
			strobeLightById: function(id){ return strobeLightById(id);}
		};
	}]);
})();