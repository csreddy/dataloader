'use strict';

angular.module('dataloaderApp')
	.controller('MainCtrl', function($scope, $http) {

		$scope.load = function(str) {
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

		function insertDoc(doc, uri, user) {
			$scope.result = []
			console.log('load', doc);
			return $http({
				method: 'PUT',
				url: 'http://' + location.hostname + ':' + location.port + '/v1/documents?uri=' + uri + '.json' + '&collection=bugs&collection=' + user,
				data: doc
			}).then(function(response) {
				$scope.result.push(uri);
			}, function(response) {
				$scope.error = "error";
			});
		}

		function insertUser(doc, uri) {
			$scope.result = [];
			return $http({
				method: 'PUT',
				url: 'http://' + location.hostname + ':' + location.port + uri,
				data: doc
			}).then(function(response) {
				$scope.result.push(uri);
			}, function(response) {
				$scope.error = "error";
			});
		}

		$scope.loadConfig = function(configData) {
			$scope.result = [];
			$http.get('data/config.json').then(function(response) {
				$http({
					method: 'PUT',
					url: 'http://' + location.hostname + ':' + location.port + '/v1/documents?uri=config.json',
					data: response.data
				}).then(function(response) {
					$scope.result.push('config.json');
				}, function(response) {
					$scope.error('Error loading config.json');
				})
			}, function(response) {
				$scope.error('Error getting config.json');
			});
			
		}


		$scope.loadUsers = function() {
			$http.get('data/users.json').then(function(response) {
				var users = response.data;
				console.log(users)
				for (var i = 0; i < users.length; i++) {
					var uri = '/v1/documents?uri=/user/' + users[i].username + '.json&collection=users';
					insertUser(users[i], uri);				
				}
			}, function(response) {
				$scope.error('Error getting ' + uri);
			});

		}





	});
