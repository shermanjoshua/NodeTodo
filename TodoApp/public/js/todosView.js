(function (angular) {

	var theModule = angular.module("todosView", []);

	theModule.controller("todosViewController",
		["$scope", "$window", "$http", 
			function ($scope,$window, $http) {
				$scope.todos = [];

				//Get the category
				var urlParts = $window.location.pathname.split("/");
				var categoryName = urlParts[urlParts.length - 1];

				var todosUrl = "/todos/" + categoryName;
				$http.get(todosUrl)
				.then(function (result) {
					// success
					$scope.todos = result.data;
				}, function (err) {
					//error
					alert(err);
				});
			}
		]);
})(window.angular);