(function(){
	var app = angular.module('hueProxyClient',[]);
	
	//this module should really just be the service below, which will be expanded to act as a client
	app.factory('hueProxyClientService',['$http','$log',function($http,$log){
		var serviceUri = null;
		
		var LIGHTS_PATH = "/lights";
		var LIGHTS_BY_ID_PATH = "/lights/%s";
		
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
			var url = serviceUri + LIGHTS_BY_ID_PATH.replace(/%s/g,id);
			$log.log("Getting light with id = '" + id + "'...");
			$log.log("Url: '" + url + "'...");
			return $http.get(url);
		};
		return {
			getLightById: function(id) { return getLightById(id);},
			getLights: function(){ return getLights();},
			getServiceUri: function(){ return getServiceUri(); },
			setServiceUri: function(serviceUri){ setServiceUri(serviceUri); }
		};
	}]);
})();