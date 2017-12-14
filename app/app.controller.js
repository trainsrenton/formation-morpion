angular.module('Morpion')
	.controller('MorpionController', function($rootScope, $scope, gameData) {
		this.playing = false;
		this.results = false;
		this.isDraw = false;
		this.winner;
		this.start = () => {
			this.playing = true;
			this.results = false;
			$rootScope.$broadcast('morpion-start');
		};

		$scope.$on('morpion-stop', () => {
            this.results = true;
            gameData.switchPlayer();
            this.isDraw = gameData.status.isDraw;
            this.winner = gameData.players[gameData.current];
            this.playing = false;
        });

	});