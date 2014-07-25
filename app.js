(function(){
	var serviceUrl = "http://127.0.0.1:9080/HueProxy/rest"; //HueProxy
	var app = angular.module('testApp',['hueProxyClient']);
	app.controller('TestController',['$log','$scope','hueProxyClientService',function($log, $scope, hueProxyClientService){
		
		//initialize hueProxyClient
		hueProxyClientService.setServiceUri(serviceUrl);
				
		this.getLightsList = function(){
			return $scope.lights;
		};
		
		this.getLights = function(){
			hueProxyClientService.getLights().success(function(data){				
				$scope.lights = data;
			});
		};
		
		this.getStateFromLight = function(lightObject){
			if(lightObject === null){ return null;}
			return lightObject.state;
		};
		
		this.getLightByLightId = function(lightId){
			hueProxyClientService.getLightById(lightId).success(function(data){
				$scope.lights[lightId - 1] = data;
			});
		};
		
		this.updateLightByLightId = function(lightId){
			var state = $scope.lights[lightId - 1].state;
			hueProxyClientService.updateLightById(lightId, state).success(function(data){
				$log.log("Successful update!");
//				$scope.lights[lightId - 1] = data;
			}).error(function(data){
				$log.log("Failed to update!");
//				$scope.lights[lightId - 1] = data;
			});
		};
		
		this.toggleLightByLightId = function(lightId){
			hueProxyClientService.toggleLightById(lightId).success(function(data){
				console.log("Successfully toggled light.");
			}).error(function(data){
				console.log("Error: " + data);
			});
		};
		
		this.strobeLightByLightId = function(lightId){
			hueProxyClientService.strobeLightById(lightId).success(function(data){
				console.log("Successfully strobed light.");
			}).error(function(data){
				console.log("Error: " + data);
			});
		};

		this.getLights();
	}]);
})();