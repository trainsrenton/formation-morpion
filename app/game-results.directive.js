angular.module('Morpion').directive('gameResults', function() {
    return{
        restrict : 'E',
        templateUrl: 'game-results.template.html',
        scope: {
            'status' : '=',
            'results' : '=',
        }
    }
});