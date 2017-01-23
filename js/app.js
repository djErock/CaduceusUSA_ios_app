var app = angular.module('iOS', ["ngRoute"]);

app.config(function($routeProvider) {
	'use strict';
    $routeProvider.when('/',{
        templateUrl: "templates/main.html",
        controller: "homeCtrl"
    }).when('/locations/',{
        templateUrl: "templates/locations.html",
        controller: "locationsCtrl"
    }).otherwise({
        templateUrl: "templates/four0four.html",
        controller: "notFoundCtrl"
    });
});

app.controller('headerCtrl', function($scope) {
	'use strict';
	$scope.nav_toggle = function(nav){
		console.log(nav);
	};
});

app.controller('homeCtrl', function($scope) {
	
});

app.controller('locationsCtrl', function($scope) {
	
});

app.controller('notFoundCtrl', function($scope) {
	
});

app.controller('footCtrl', function($scope) {
	
});


app.directive('slider', ['$interval', '$http', function($interval, $http) {
    return {
        restrict: 'A',
	   scope: false,
        template: '<img ng-class="show($index)" ng-repeat="image in images" ng-src="{{image.src}}" alt="{{image.desc}}" />',
        link: function (scope, elem, attrs, ctrl) {
			scope.setTime = 4000;
			$http.get('data/top_slider.JSON')
			.then(function(response){
				scope.images = response.data;
        		scope.numberOfImages = scope.images.length;
        		scope.selectedImage = 0;
				scope.autoSlider = function (){
					scope.selectedImage < scope.numberOfImages - 1 ? scope.selectedImage++ : scope.selectedImage = 0;
				};
				scope.startSlider = function(){
					scope.intervalPromise = $interval(scope.autoSlider,scope.setTime);
					scope.activeStart = true;
					scope.activePause = false;
				};
				scope.startSlider();
				scope.show = function(idx){
					if (scope.selectedImage==idx) {
						return "show";
					}
				};
			}, function(error) {
				console.log(error);
			});
		}
    }
}]);
