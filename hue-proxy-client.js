(function(){
	var app = angular.module('hueProxyClient',[]);
	
	//this module should really just be the service below, which will be expanded to act as a client
	app.factory('hueProxyClientService',['$http','$log',function($http,$log){
		var getLights = function(){
			$log.log("Getting basic lights info...");
			return $http.get(serviceUrl + '/api/newdeveloper/lights');
		};
		var getLightById = function(id){
			$log.log("Getting light with id = '" + id + "'...");
			return $http.get(serviceUrl + '/api/newdeveloper/lights/' + id);
		};
		return {
			getLightById: function(id) { return getLightById(id);},
			getLights: function(){ return getLights();}
		};
	}]);
})();