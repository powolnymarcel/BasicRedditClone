                                                       //Now that we have ui-router included, we need to configure it. In our app.js, we're going to use the Angular config() function to setup a home state.
var app = angular.module('basicRedditClone', ['ui.router']);

app
    //*******************************************************************************************************************************CONFIG
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('accueil', {
                    url: '/accueil',
                    templateUrl: 'accueil.html',
                    controller: 'ControlleurPrincipal'
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: 'posts.html',
                    controller: 'PostsCtrl'
                });

            $urlRouterProvider.otherwise('accueil');
        }])
    //*******************************************************************************************************************************CONTROLLEUR
    // ***************************************************************************************ControlleurPrincipal
    .controller('ControlleurPrincipal', ['$scope','$filter','posts',function($scope,$filter,posts){
        // Vas chercher dans le factory les data
        $scope.posts = posts.posts;
console.log($scope.posts);
        // Fn pour ajouter un post
        $scope.ajouterPost = function(){
            // Eviter que le user laisse le champs vide
            if(!$scope.titre || $scope.titre === '') { return; }
            // Ajouter au le post au tableau de posts
            $scope.posts.push({
                id:($scope.posts.length)+1,
                titre: $scope.titre,
                description:$scope.description,
                votesPositifs: 0,
                voteNegatifs: 0,
                lien:$scope.lien,
                comments: [
                    {auteur: 'Joe', body: 'Cool post!', votePositifs: 0,voteNegatifs: 0},
                    {auteur: 'Bob', body: 'Great idea but everything is wrong!', votePositifs: 0,voteNegatifs: 0}
                ]
            });
            // rendre les champs vide
            $scope.titre=''
            $scope.lien=''
            $scope.description=''
            //Appelle la directive pour cacher le formulaire
            $scope.cacherLaModal();
        };

        // Fn pour augmenter le vote d'un post
        $scope.AugmenterVotePositif = function(post) {
            post.votesPositifs += 1;
        };
        // Fn pour diminuer le vote d'un post
        $scope.DiminuerVotePositif = function(post) {
            post.voteNegatifs += 1;
        };
        var orderBy = $filter('orderBy');
        //cette fn se retrouve dans le html, elle est appelée et recoit l'ordre de tri
        $scope.order = function(laFaconDeTrier) {
            $scope.posts = orderBy($scope.posts, laFaconDeTrier);
        };

}])
    // *****************************************************************************************************        PostsCtrl
    // On crée un controlleur pour les posts, à ce controlleur on injecte le factory posts pour avoir les data dispo
    .controller('PostsCtrl', ['$scope','$stateParams','posts', function($scope, $stateParams, posts){
        // Pour avoir l'id du post(bien faire attention au pluriel 's' ou pas 's')
        $scope.post = posts.posts[$stateParams.id];
        $scope.ajoutCommentaire = function(){
            // Si commentaire vide, ne fait rien
            if($scope.body === '') { return; }
            $scope.post.comments.push({
                body: $scope.body,
                auteur: 'user',
                voteNegatifs: 0,
                votePositifs: 0
            });
            $scope.body = '';
        };

    }])


    // *****************************************************************************************************DIRECTIVES
    //Permet de cacher la modal à l'envoi du formu
    .directive('permetDeCacherLaModalAuSubmit', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.cacherLaModal = function() {
                element.modal('hide');
            };
        }
    }
})
    // ******************************************************************************************FACTORY/SERVICE(l'usine, le constructeur) rappel les controlleur doivent etre léger, de ctrl à actions
    //Incovénient de stocker des data dans le controlleur :
            //when the controller goes out of scope, we lose the data
            //that data cannot be easily accessed from other controllers or directives
            //the data is difficult to mock, which is important when writing automated tests
    //Donc on crée un service
    // You may be wondering why we're using the keyword factory instead of service. In angular, factory and service are related in that they are both instances of a third entity called provider.
    //... someone trying to have persistent data in his or her controller. That’s just not the purpose of a controller
    //For memory purposes, controllers are instantiated only when they are needed and discarded when they are not. Because of this, every time you switch a route or reload a page, Angular
    //cleans up the current controller. Services however provide a means for keeping data around for the lifetime of an application while they also can be used across different controllers in a consistent manner.
    .factory('posts', [function(){

        //You'll note that we could have simply exported the posts array directly,
        // however, by exporting an object that contains the posts array we can add new objects and methods to our services in the future.
        var o = {
            posts: [
                {"id":0,"titre": 'post 0',"lien":"http://www.google.fr", "description":"Je suis 0 la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "voteNegatifs":1,"votesPositifs": 55,comments: [
                    {auteur: 'Joe', body: 'Cool post!', votePositifs: 0,voteNegatifs: 0},
                    {auteur: 'Bob', body: 'Great idea but everything is wrong!', votePositifs: 0,voteNegatifs: 0}
                ]},
                {"id":1,"titre": 'post 1',"lien":"http://www.google.fr", "description":"Je suis 1 la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "voteNegatifs":1,"votesPositifs": 55,comments: [
                    {auteur: 'Joe', body: 'Cool post!', votePositifs: 0,voteNegatifs: 0},
                    {auteur: 'Bob', body: 'Great idea but everything is wrong!', votePositifs: 0,voteNegatifs: 0}
                ]},
                {"id":2,"titre": 'post 2',"lien":"http://www.google.fr", "description":"Je suis 2 la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "voteNegatifs":1,"votesPositifs": 66,comments: [
                    {auteur: 'Joe', body: 'Cool post!', votePositifs: 0,voteNegatifs: 0},
                    {auteur: 'Bob', body: 'Great idea but everything is wrong!', votePositifs: 0,voteNegatifs: 0}
                ]},
                {"id":3,"titre": 'post 3',"lien":"http://www.google.fr", "description":"Je suis 3 la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "voteNegatifs":1,"votesPositifs": 15,comments: [
                    {auteur: 'Joe', body: 'Cool post!', votePositifs: 0,voteNegatifs: 0},
                    {auteur: 'Bob', body: 'Great idea but everything is wrong!', votePositifs: 0,voteNegatifs: 0}
                ]},
                {"id":4,"titre": 'post 4',"lien":"http://www.google.fr", "description":"Je suis 4 la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "voteNegatifs":1,"votesPositifs":  9,comments: [
                    {auteur: 'Joe', body: 'Cool post!', votePositifs: 0,voteNegatifs: 0},
                    {auteur: 'Bob', body: 'Great idea but everything is wrong!', votePositifs: 0,voteNegatifs: 0}
                ]},
                {"id":5,"titre": 'post 5',"lien":"http://www.google.fr", "description":"Je suis 5 la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "voteNegatifs":111,"votesPositifs":4,comments: [
                    {auteur: 'Joe', body: 'Cool post!', votePositifs: 0,voteNegatifs: 0},
                    {auteur: 'Bob', body: 'Great idea but everything is wrong!', votePositifs: 0,voteNegatifs: 0}
                ]},
                {"id":6,"titre": 'post 6',"lien":"http://www.google.fr", "description":"Je suis 6 la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "voteNegatifs":1,"votesPositifs":  0,comments: [
                    {auteur: 'Joe', body: 'Cool post!', votePositifs: 0,voteNegatifs: 0},
                    {auteur: 'Bob', body: 'Great idea but everything is wrong!', votePositifs: 0,voteNegatifs: 0}
                ]},
                {"id":7,"titre": 'post 7',"lien":"http://www.google.fr", "description":"Je suis 7 la description du post, je peux faire autant de caractères que je veux, je suis la description !!!!!! ", "voteNegatifs":15,"votesPositifs": 1,comments: [
                    {auteur: 'Joe', body: 'Cool post!', votePositifs: 0,voteNegatifs: 0},
                    {auteur: 'Bob', body: 'Great idea but everything is wrong!', votePositifs: 0,voteNegatifs: 0}
                ]}
            ]
        };
        return o;
}]);

