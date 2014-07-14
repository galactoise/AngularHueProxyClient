(function(){
	var client = angular.module('hueProxyClient',[]);
	client.controller('hueProxyController',['$http','$log',function($http,$log){
		
		
		
		this.getLight2 = function(lights){
			$log.log(lights);
			$http.get(serviceUrl + '/api/newdeveloper/lights/2').success(function(data){
				$log.log(data);
				angular.extend(lights[2],data);
			}).error(function(data){
				$log.log("ERROR");
			});
		};
	}]);
})();