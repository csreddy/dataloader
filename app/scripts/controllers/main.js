'use strict';

angular.module('dataloaderApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	//$scope.docs = "a";
	
	
	
	$scope.load = function (str) {
		var obj = JSON.parse(str);
		console.log(obj)
		 for (var i = 0; i < obj.length; i++) {
			 var doc = obj[i];
			 console.log(obj[i])
			 var uri = obj[i].id;
			 var user = obj[i].submittedBy.username;
			 insertDoc(doc, uri, user);
		 }
	}
	
	function insertDoc (doc, uri, user) {
		$scope.result = []
		console.log('load', doc);
	return	$http({
            method: 'PUT',
            url: 'http://' + location.hostname + ':' + location.port + '/v1/documents?uri=' + uri + '.json'+ '&collection=bugs&collection=' + user,
			data: doc
        }).then(function (response) {
			$scope.result.push(uri);
        }, function (response) {
        	$scope.docs = "error";
        });
	}
	
	
	$scope.loadConfig = function insertConfig() {
		$scope.result = [];
		$http.get('data/config.json').then(function (response) {
			$scope.result.push(response.data);
			$http({
						method: 'PUT',
						url: 'http://' + location.hostname + ':' + location.port + '/v1/documents?uri=config1.json',
						data: response.data
					}).then(function (response) {
						$scope.result.push('config.json');
					}, function (response) {
						$scope.push.result('Error loading config.json');
					})
		}, function (response) {
			$scope.push.result('Error getting config.json');
		});
	}
	
	
	
	
  });
