(function(){
	serviceUrl = "http://192.168.1.252";
	var lightsSample = {"1":{"state": {"on":false,"bri":6,"hue":87,"sat":250,"xy":[0.6695,0.3235],"ct":500,"alert":"none","effect":"none","colormode":"xy","reachable":true}, "type": "Extended color light", "name": "Lamp1", "modelid": "LCT001", "swversion": "66010820", "pointsymbol": { "1":"0a00f1f01f1f1001f1ff100000000001f2000000", "2":"none", "3":"none", "4":"none", "5":"none", "6":"none", "7":"none", "8":"none" }},"2":{"name": "Overhead1"},"3":{"name": "Overhead2"}};
	var app = angular.module('testApp',['hueProxyClient']);
	app.controller('TestController',['$log',function($log){
		this.lights = lightsSample;	
		
		this.describeLights = function(){
			$log.log(this.lights);
		};
	}]);
})();