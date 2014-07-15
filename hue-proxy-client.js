(function(){
	var app = angular.module('hueProxyClient',[]);
	
	//Deprecate this - service is better way to go
	app.controller('hueProxyController',['$http','$log',function($http,$log){
		
		
		
		this.getLight2 = function(lights){
			$http.get(serviceUrl + '/api/newdeveloper/lights/2').success(function(data){
				angular.extend(lights[2],data);
			}).error(function(data){
				$log.log("ERROR");
			});
		};
	}]);
	
	//this module should really just be the service below, which will be expanded to act as a client
	app.factory('hueProxyClientService',['$http','$log',function($http,$log){
		var getLightById = function(id){
			$log.log("Getting light with id = '" + id + "'...");
			return $http.get(serviceUrl + '/api/newdeveloper/lights/2');
		};
		return {
			getLightById: function(id) { return getLightById(id);}
		};
	}]);
})();