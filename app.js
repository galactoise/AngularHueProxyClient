(function(){
	serviceUrl = "http://192.168.1.252";
	var app = angular.module('testApp',['hueProxyClient']);
	app.controller('TestController',['$log','$scope','hueProxyClientService',function($log, $scope, hueProxyClientService){
		$scope.lights = null;
		
		hueProxyClientService.getLights().success(function(data){
			$scope.lights = data;
		});
		
		this.getLights = function(){
			$log.log($scope.lights);
			return $scope.lights;
		};
		
		this.getStateFromLight = function(lightObject){
			return lightObject.state;
		};
		
		//really need to use $scope to store data that will be auto-updated
		this.triggerService = function(lightId){
			hueProxyClientService.getLightById(lightId).success(function(data){
				$scope.lights[lightId] = data;
			});
			
		};
	}]);
})();