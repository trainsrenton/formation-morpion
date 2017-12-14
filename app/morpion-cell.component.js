angular.module('Morpion')
	.component('morpionCell', {
		templateUrl: 'morpion-cell.template.html',
		bindings: {
			'index': '@'
		},
		controller: function($scope, gameData) {
			var ctrl = this;
			ctrl.played = false;
			ctrl.playerClass = '';
			ctrl.play = () => {
				if (!ctrl.played) {
					ctrl.played = true;
					ctrl.playerClass = gameData.players[gameData.current];
					gameData.switchPlayer();
					gameData.values[ctrl.index] = ctrl.playerClass;
				} else {
					console.warn('Impossible de jouer ici...');
				}
			};

			ctrl.reset = () => {
                ctrl.played = false;
                ctrl.playerClass = '';
            }

            $scope.$on('morpion-start', ctrl.reset);
		}
	});