var app = angular.module('basicRedditClone', []);

app.controller('ControlleurPrincipal', ['$scope','$filter',function($scope,$filter){

    var orderBy = $filter('orderBy');

    //Data pour populer l'app
        $scope.posts = [
            {"titre": 'post 1', "description":"Je suis la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "votesPositifs": 5},
            {"titre": 'post 2', "description":"Je suis la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "votesPositifs": 2},
            {"titre": 'post 3', "description":"Je suis la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "votesPositifs": 15},
            {"titre": 'post 4', "description":"Je suis la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "votesPositifs": 9},
            {"titre": 'post 5', "description":"Je suis la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "votesPositifs": 4},
            {"titre": 'post 5', "description":"Je suis la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "votesPositifs": 0},
            {"titre": 'post 5', "description":"Je suis la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "votesPositifs": 1}
        ];

        // Fn pour ajouter un post
        $scope.ajouterPost = function(){
            // Eviter que le user laisse le champs vide
            if(!$scope.titre || $scope.titre === '') { return; }
            // Ajouter au le post au tableau de posts
            $scope.posts.push({titre: $scope.titre, votesPositifs: 0});
            // rendre le champs vide
            $scope.titre='';
        };

        // Fn pour augmenter le vote d'un post
        $scope.AugmenterVotePositif = function(post) {
            post.votesPositifs += 1;
        };

        // Fn pour diminuer le vote d'un post
        $scope.DiminuerVotePositif = function(post) {
            //Pour éviter négatif ? décommenter
           //if(post.votesPositifs <=0) {
           //    return;
           //}
            post.votesPositifs -= 1;
        };
        $scope.order = function(predicate) {

        $scope.posts = orderBy($scope.posts, predicate);
    };
}]);

