var app = angular.module('flapperNews', [
    'ui.router'
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('post', {
                url:'/posts/{id}',
                templateUrl: '/post-details.html',
                controller: 'PostsCtrl'
            });
        $urlRouterProvider
            .otherwise('home');
    }
]);

app.controller(
    'MainCtrl', [
        '$scope',
        'postsFactory',
        function($scope, postsFactory) {
            $scope.posts = postsFactory.posts;

            $scope.addPost = function() {
                if (!$scope.title || $scope.title === '') {return;}
                $scope.posts.push({
                    title: $scope.title,
                    link: $scope.link,
                    upvotes: 0,
                    comments: []
                });
                $scope.title = '';
                $scope.link = '';
            };

            $scope.incrementUpvotes = function(post) {
                if (!post) {return;}
                post.upvotes++;
            };
        }]);

app.controller(
    'PostsCtrl', [
        '$scope',
        '$stateParams',
        'postsFactory',
        function($scope, $stateParams, postsFactory) {
            $scope.post = postsFactory.posts[$stateParams.id];

            $scope.addComment = function() {
                if (!$scope.body || $scope.body === '') {return;}
                $scope.post.comments.push({
                    author: 'user',
                    body: $scope.body,
                    upvotes: 0
                });
                $scope.body = '';
            };

            $scope.incrementUpvotes = function(comment) {
                if (!comment) {return;}
                comment.upvotes++;
            };
        }
    ]);

app.factory('postsFactory', [
    function() {
        var o = {
            posts: []
        };
        return o;
    }
]);