var app = angular.module('basicRedditClone', []);

app.controller('ControlleurPrincipal', ['$scope',function($scope){

        $scope.posts = [
            {"titre": 'post 1', "votesPositifs": 5},
            {"titre": 'post 2', "votesPositifs": 2},
            {"titre": 'post 3', "votesPositifs": 15},
            {"titre": 'post 4', "votesPositifs": 9},
            {"titre": 'post 5', "votesPositifs": 4},
            {"titre": 'post 5', "votesPositifs": 0},
            {"titre": 'post 5', "votesPositifs": 1}
        ];
    }]);

