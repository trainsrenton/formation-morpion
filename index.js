"use strict";

$(document).ready(() => {
	let Player = function(username, cssClass) {
		this.username = username;
		this.cssClass = cssClass;
		this.score = 0;
	}
	
	let init = () => {
		let username1 = $('#username1').val().trim();
		let username2 = $('#username2').val().trim();
		if (username1 && username2) {
			morpion.players.push(new Player(username1, 'redPlayer'));
			morpion.players.push(new Player(username2, 'bluePlayer'));
			let playerInfos = $('div#infos > div');
			playerInfos[0].classList.add(morpion.players[0].cssClass);
			playerInfos[1].classList.add(morpion.players[1].cssClass);
			morpion.players.forEach((player, index) => {
				playerInfos[index].children[0].textContent = player.username;
				playerInfos[index].children[1].textContent = player.score;
			});
		} else {
			// TODO: Afficher un message d'erreur.
		}
	};
	
	let start = (restart) => {
		if (!restart) {
			init();
		}
		// Cacher le formulaire (div#start).
		$('div#start').hide();
		// Montrer la grille du morpion.
		$('div#morpion').show();
		// Ajout de l'écoute de l'événement click sur chaque <td>.
		$('div#morpion table td').each((index, item) => {
			$(item).click(morpion.listener);
		});
	};
	
	let clickListener = (event) => {
		let cell = $(event.currentTarget);
		let player = morpion.players[morpion.currentPlayer];
		// Inscription du symbol du joueur dans la cellule.
		cell.append($('<div class="' + player.cssClass + '"></div>'));
		// Désactivation des listener sur la cellule.
		cell.unbind();
		if (morpion.isFinished()) {
			// La partie est terminée.
			morpion.showResults();
		} else {
			// La partie continue, joueur suivant.
			morpion.switchPlayer();
		}
	};
	
	let showResults = () => {
		let resultsDiv = $('div#results');
		$('div#morpion').fadeOut();
		// Cas avec victoire.
		let resultsContent = resultsDiv.children('div');
		let winner = morpion.result.winner;
		if (winner) {
			resultsContent.append($('<h1 class="'
				+ winner.cssClass + '">Le joueur '
				+ winner.username + ' a gagné la partie !</h1>'));
			++winner.score;
			$('div#infos div.' + winner.cssClass)[0]
				.children[1].textContent = winner.score;
		} else if (morpion.result.isFull) {
			// Cas égalité.
			resultsContent.append($('<h1 class="draw">Match nul !</h1>'));
		}
		resultsDiv.fadeIn();
	};
	
	let isFinished = () => {
		let results = [[], [], []];
		let turnCount = 0;
		// Pour chaque ligne du morpion.
		$('div#morpion tr').each((i, line) => {
			// Pour chaque cellule.
			$(line).find('td').each((j, cell) => {
				let symbol = $(cell).children('div');
				if (symbol.length > 0) {
					let cssClass = symbol[0].className;
					results[i][j] = cssClass;
					++turnCount;
				}
			});
		});
		// Vérification des conditions de victoire.
		// Lignes
		let hasWon = checkWinCase(results[0][0],results[0][1],results[0][2]);
		hasWon = hasWon || checkWinCase(results[1][0],results[1][1],results[1][2]);
		hasWon = hasWon || checkWinCase(results[2][0],results[2][1],results[2][2]);
		// Colonnes
		for (let i = 0; i < results.length; ++i) {
			hasWon = hasWon
				|| checkWinCase(results[0][i], results[1][i], results[2][i]);
		}
		// Diagonales
		hasWon = hasWon || checkWinCase(results[0][0], results[1][1], results[2][2]);
		hasWon = hasWon || checkWinCase(results[0][2], results[1][1], results[2][0]);
		// Si il y a victoire, remplir winner.
		if (hasWon) {
			morpion.result.winner = morpion.players[morpion.currentPlayer];
		}
		// Vérification du cas d'égalité.
		morpion.result.isFull = turnCount === 9;
		// Renvoyer vrai si partie terminée.
		return morpion.result.isFull || morpion.result.winner;
	};
	
	function checkWinCase(cell1, cell2, cell3) {
		return cell1 && cell1 === cell2 && cell1 === cell3;
	};
	
	let restart = () => {
		// Réinitialisation du code HTML.
		$('div#results div').empty();
		$('div#results').hide();
		$('div#morpion td').empty().unbind();
		$('div#morpion').show();
		// Réinitialisation de l'état du Morpion.
		morpion.players.reverse();
		morpion.currentPlayer = 0;
		morpion.result = {
			isFull: false,
			winner: null
		};
		morpion.start(true);
	};
	
	window.morpion = {
		players: [],
		currentPlayer: 0,
		switchPlayer: () => {
			morpion.currentPlayer = ++morpion.currentPlayer % morpion.players.length;
		},
		start: start,
		restart: restart,
		listener: clickListener,
		result: {
			isFull: false,
			winner: null
		},
		isFinished: isFinished,
		showResults: showResults
	};
});