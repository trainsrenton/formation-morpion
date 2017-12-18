angular.module('Morpion')
    .controller('MorpionController', function() {
        this.playing = false;
        this.results = false;
        this.start = () => {
            this.playing = true;
            this.results = false;
        };
        this.doStop = (status) => {
            this.results = true;
            this.status = status;
            this.playing = false;
        };
    });