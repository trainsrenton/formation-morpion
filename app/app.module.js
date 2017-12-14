"use strict";

let gameData = {
    players: ['red', 'blue'],
    current: 0,
    values: [],
    switchPlayer: () => gameData.current = (gameData.current + 1) % 2,
    status: {
        isDraw: false,
        winner: '',
        playing: false
    }

};

angular.module('Morpion', []).value('gameData', gameData);