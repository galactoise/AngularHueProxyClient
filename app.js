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
				$scope.lights[lightId] = data;
			});
		};
		
		this.updateLightByLightId = function(lightId){
			var light = $scope.lights[lightId];
			hueProxyClientService.updateLightById(lightId, light).success(function(data){
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
				$log.log("Error: " + data);
			});
		};
		
		this.strobeLightByLightId = function(lightId){
			hueProxyClientService.strobeLightById(lightId).success(function(data){
				console.log("Successfully strobed light.");
			}).error(function(data){
				$log.log("Error: " + data);
			});
		};
		this.convertHexToFloat = function(hex){
			var decimal = parseInt("0x" + hex);
			var float = decimal / 255;
			return float;
		};
		
		this.convertRGBToHSL = function(RGB){
			
			var R_float= this.convertHexToFloat(RGB.substring(1,3));
			var G_float = this.convertHexToFloat(RGB.substring(3,5));
			var B_float = this.convertHexToFloat(RGB.substring(5,7));

			var minValue = Math.min.apply(Math, [R_float, G_float, B_float] );	//Min. value of RGB
			var maxValue = Math.max.apply(Math, [R_float, G_float, B_float]);	//Max. value of RGB
			var maxDelta = maxValue - minValue;			//Delta RGB value

			var L = ( maxValue + minValue ) / 2;
			
			var H = null;
			var S = null;
			if ( maxDelta == 0 ){					//This is a gray, no chroma...

				H = 0;								//HSL results from 0 to 1
				S = 0;
			}else{									//Chromatic data...

				if ( L < 0.5 ){
					S = maxDelta / ( maxValue + minValue );
				}else{
					S = maxDelta / ( 2 - maxValue - minValue );
				}

				var deltaR = ( ( ( maxValue - R_float ) / 6 ) + ( maxDelta / 2 ) ) / maxDelta;
				var deltaG = ( ( ( maxValue - G_float ) / 6 ) + ( maxDelta / 2 ) ) / maxDelta;
				var deltaB = ( ( ( maxValue - B_float ) / 6 ) + ( maxDelta / 2 ) ) / maxDelta;

				if( R_float == maxValue ){ 
					H = deltaB - deltaG;
				}else if ( G_float == maxValue ){ 
					H = ( 1 / 3 ) + deltaR - deltaB;
				}else if ( B_float == maxValue ){ 
					H = ( 2 / 3 ) + deltaG - deltaR;
				}

				if ( H < 0 ){
					H += 1;
				}
				if ( H > 1 ){
					H -= 1;
				}
				$log.log("H=" + H + ",S=" + S + ",L=" + L);
				
				return {"H":H, "S":S,"L":L};
			}
		};
		
		this.convertRGBToLowerCaseXY = function(RGB){		
			var R_float= this.convertHexToFloat(RGB.substring(1,3));
			var G_float = this.convertHexToFloat(RGB.substring(3,5));
			var B_float = this.convertHexToFloat(RGB.substring(5,7));

			$log.log("R_float: " + R_float);
			$log.log("G_float: " + G_float);
			$log.log("B_float: " + B_float);
			
			var X = (1.076450 * R_float) - (0.237662 * G_float) + (0.161212 * B_float);
			var Y = (0.410964 * R_float) + (0.554342 * G_float) + (0.034694 * B_float);
			var Z = (-0.010954 * R_float) - (0.013389 * G_float) + (1.024343 * B_float);

			$log.log("X: " + X);
			$log.log("Y: " + Y);
			$log.log("Z: " + Z);
			
			var x = X / (X + Y + Z);
			var y = Y / (X + Y + Z);

			$log.log("x: " + x);
			$log.log("y: " + y);
			
			$log.log("XY: " + x.toPrecision(4) + "," + y.toPrecision(4));
		};

		this.getLights();
	}]);
})();