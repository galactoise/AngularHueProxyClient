(function(){
//	var serviceUrl = "http://192.168.1.252/api/newdeveloper"; //Direct-to-Hue
	var serviceUrl = "http://127.0.0.1:9080/HueProxy/rest"; //HueProxy
	var app = angular.module('testApp',['hueProxyClient']);
	app.controller('TestController',['$log','$scope','hueProxyClientService',function($log, $scope, hueProxyClientService){
		$scope.lights = null;
		
		hueProxyClientService.setServiceUri(serviceUrl);
		
		hueProxyClientService.getLights().success(function(data){
			
			/**
			 * This is a stupid hack to convert between direct hue response, and proxy response
			 * It should be removed once hue-proxy-client reliably talks only to the proxy
			 * When it is removed, references by light id will also need to be changed to be id - 1
			 */
			if(data instanceof Array){
				data.unshift(null);
			}
			
			$scope.lights = data;
		});
		
		this.getLights = function(){
			return $scope.lights;
		};
		
		this.getStateFromLight = function(lightObject){
			if(lightObject === null){ return null;}
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