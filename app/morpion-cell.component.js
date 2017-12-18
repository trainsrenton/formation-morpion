angular.module('Morpion')
	.component('morpionCell', {
		templateUrl: 'morpion-cell.template.html',
		bindings: {
			'index': '@',
            'onMove' : '&',
            'currentPlayer' : '<'
		},
		controller: function() {
			var ctrl = this;
			ctrl.played = false;
			ctrl.playerClass = '';
			ctrl.play = () => {
				if (!ctrl.played) {
					ctrl.played = true;
					ctrl.playerClass = ctrl.currentPlayer;
					ctrl.onMove({index: ctrl.index});
				} else {
					console.warn('Impossible de jouer ici...');
				}
			};

			ctrl.reset = () => {
                ctrl.played = false;
                ctrl.playerClass = '';
            };

			ctrl.$onChanges = (changes) => {
			    if(changes.currentPlayer.currentValue === '' &&
                    changes.currentPlayer.previousValue){
			        ctrl.reset();
                }
            }
		}
	});