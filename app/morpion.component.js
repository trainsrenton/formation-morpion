angular.module('Morpion')
    .component('morpion', {
        templateUrl: 'morpion.template.html',
        bindings: {
            'onStop': '&',
            'playing': '<'
        },
        controller: function($scope) {
            var ctrl = this;
            ctrl.gameData = {
                players: ['red', 'blue'],
                current: 0,
                values: [],
                status: {
                    isDraw: false,
                    winner: '',
                    playing: false
                },
                switchPlayer: () => ctrl.gameData.current = (ctrl.gameData.current + 1) % 2
            };
            ctrl.update = () => {
                ctrl.currentPlayer = ctrl.gameData.players[ctrl.gameData.current];
            };
            ctrl.doMove = (index) => {
                ctrl.gameData.values[index] = ctrl.currentPlayer;
                if (!ctrl.checkWin()) {
                    ctrl.gameData.switchPlayer();
                    ctrl.update();
                } else {
                    ctrl.gameData.status.winner = ctrl.currentPlayer;
                    ctrl.onStop({status: ctrl.gameData.status});
                    ctrl.started = false;
                    ctrl.currentPlayer = '';
                }
            };
            let checkCase = (c1, c2, c3) => {
                return c1 ? c1 === c2 && c1 === c3 : false;
            };
            ctrl.checkWin = () => {
                // Vérification des cases jouées.
                let result = false;
                for (let i = 0; i < 9; ++i) {
                    if (i % 3 == 0) {
                        // Lignes
                        result = result || checkCase(
                                ctrl.gameData.values[i],
                                ctrl.gameData.values[i+1],
                                ctrl.gameData.values[i+2]);
                    }
                    if (i < 3) {
                        // Colonnes
                        result = result || checkCase(
                                ctrl.gameData.values[i],
                                ctrl.gameData.values[i+3],
                                ctrl.gameData.values[i+6]);
                    }
                }
                // Diagonales
                result = result || checkCase(
                        ctrl.gameData.values[0],
                        ctrl.gameData.values[4],
                        ctrl.gameData.values[8]);
                result = result || checkCase(
                        ctrl.gameData.values[2],
                        ctrl.gameData.values[4],
                        ctrl.gameData.values[6]);
                let isDraw = !result && Object.keys(ctrl.gameData.values).length === 9;
                if (result || isDraw) {
                    ctrl.gameData.status.isDraw = isDraw;
                    return true;
                } else {
                    return false;
                }
            };
            ctrl.started = false;
            ctrl.$doCheck = () => {
                if (ctrl.playing && !ctrl.started) {
                    ctrl.gameData.players.reverse();
                    ctrl.gameData.current = 0;
                    ctrl.update();
                    ctrl.gameData.values = [];
                    ctrl.gameData.status.isDraw = false;
                    ctrl.gameData.status.playing = false;
                    ctrl.gameData.status.winner = '';
                    ctrl.started = true;
                }
            };
        }
    });