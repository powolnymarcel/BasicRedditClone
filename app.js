var app = angular.module('basicRedditClone', []);

app.controller('ControlleurPrincipal', ['$scope',function($scope){

        $scope.posts = [
            'Post 1',
            'Post 2',
            'Post 3',
            'Post 4',
            'Post 5',
            'Post 6',
        ];
    }]);