(function() {
    let game = {
        board: [[0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]],
                
        init: function() {
            this.cacheDom();
            this.bindEvents();
            console.log('Init');
            console.log(game.board)
        },

        cacheDom: function() {
            this.startGameButton = document.getElementById('start-game');
            this.tile = document.querySelectorAll('.game-tile');
            this.gameMessage = document.getElementById('game-message');
        },

        bindEvents: function() {
            let tiles = this.tile; 
            tiles.forEach(function(tile) {
                tile.addEventListener('click', game.handleMouseClick);
                // Remove right click menu on game board
                tile.addEventListener('contextmenu', function(event) {
                    event.preventDefault();
                });
            });

            this.startGameButton.addEventListener('click', game.startGame);
            window.onload = game.startGame();
        },

        handleMouseClick: function(event) {
            let tileId = this.id;
            game.naughtSelect(tileId);
        },

        crossSelect: function(tileId) {
            console.log('Cross selected on:', tileId);
            let tile = document.getElementById(tileId);
            tile.innerHTML = '<img src="images/x.svg" class="x-marker">';
            let marker = 'X'
            game.mapBoard(tileId, marker);
        },
        

        naughtSelect: function(tileId) {
            console.log('Naught selected on:', tileId);
            let tile = document.getElementById(tileId);
            tile.innerHTML = '<img src="images/o.svg" class="o-marker">';
            let marker = 'O'
            game.mapBoard(tileId, marker);
        },

        mapBoard: function(tileId, marker) {
            let position = tileId;
            switch(position) {
                case "r1c1":
                    game.board[0][0] = marker;
                    break;
                case "r1c2":
                    game.board[0][1] = marker;
                    break;
                case "r1c3":
                    game.board[0][2] = marker;
                    break;
                case "r2c1":
                    game.board[1][0] = marker;
                    break;
                case "r2c2":
                    game.board[1][1] = marker;
                    break;
                case "r2c3":
                    game.board[1][2] = marker;
                    break;
                case "r3c1":
                    game.board[2][0] = marker;
                    break;
                case "r3c2":
                    game.board[2][1] = marker;
                    break;
                case "r3c3":
                    game.board[2][2] = marker;
                    break;
            }
            console.log(game.board)
        },

        

        startGame: function() {
            let startingPlayer = game.decideStartingPlayer();
            let isPlayerTurn = game.decideStartingPlayer() === 'player';
            game.playMove(isPlayerTurn);


            // Choose next round starting player //
            let nextStartingPlayer;
            (startingPlayer === 'player') 
            ? nextStartingPlayer = 'computer' : nextStartingPlayer = 'player';

           

        },


        decideStartingPlayer: function() {
            let randomNumber = Math.random();
            if (randomNumber < 0.5) {
                this.gameMessage.textContent = 'You start first with X'
                return "player";
            } else {
                this.gameMessage.textContent = 'Computer starts first with O'
                return "computer";
            }
        },

        playMove: function(isPlayerTurn) {
            if (isPlayerTurn) {
                // Players turn
                console.log('players turn')
                game.playerMove();




            } else {
                // computers turn
                console.log('computer turn')
                game.computerMove();
            }
        },

        computerMove: function() {
            
        },

        playerMove: function() {

        },

        
        


    };

    game.init();
})();



