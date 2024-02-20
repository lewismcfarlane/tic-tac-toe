(function() {
    let game = {
        board: [[0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]],

        startingPlayer: '',
        computerMarker: null,
        playerMarker: null,
        moveCounter: 0,
        gameOver: false,
        winner: null,
        counter: 0,
        isPlayerTurn: null,
        playerScore: 0,
        computerScore: 0,


        increaseMoveCounter: function() {
            game.moveCounter++
        },
                
        init: function() {
            this.cacheDom();
            this.bindEvents();
            // this.startGame();
      
        },

        cacheDom: function() {
            this.startGameButton = document.getElementById('start-game');
            this.tile = document.querySelectorAll('.game-tile');
            this.gameMessage = document.getElementById('game-message');
            this.gameBoard = document.getElementById('game-board');
            this.playerScoreMessage = document.getElementById('player-score');
            this.computerScoreMessage = document.getElementById('computer-score');
            
        },

        bindEvents: function() {
            this.gameBoard.addEventListener('contextmenu', function(event) {
                  event.preventDefault();
            });
            this.startGameButton.addEventListener('click', game.startGame);
            
            
        },

        bindBoardTiles: function() {
            let tiles = this.tile; 
            tiles.forEach(function(tile) {
                tile.addEventListener('click', game.playerMove);
            
                
            });
            this.gameBoard.addEventListener('dblclick', function(event) {
                event.preventDefault();
            });
            this.gameBoard.addEventListener('contextmenu', function(event) {
                event.preventDefault();
            });
        },

        playerMove: function(event) {
            
            let tileId = this.id;
            
            let marker = game.playerMarker;
            console.log(marker)
            if (marker === 'X') {
                game.crossSelect(tileId);
            } else if (marker === 'O') {
                game.naughtSelect(tileId)
            };
            

            if (game.checkWinCondition()) {
                console.log('Game over!', game.winner, 'player move function')
                game.gameOver = true;
                return;
            } else {
                game.isPlayerTurn = false;
                game.gameMessage.textContent = 'test'
                game.computerMove();
            }

            
        },

        // crossSelect: function(tileId) {
           
        //     let tile = document.getElementById(tileId);
        //     tile.innerHTML = '<img src="images/x.svg" class="x-marker">';
        //     let marker = 'X'
        //     game.mapBoard(tileId, marker);
            
            
        //     if (game.checkWinCondition()) {
        //         console.log('Game over!', game.winner, 'cross select')
                
                
        //     }
        //     tile.removeEventListener('click', game.playerMove);
        // },

        crossSelect: function(tileId) {
            let tile = document.getElementById(tileId);
            tile.innerHTML = '<img src="images/x.svg" class="x-marker">';
            let marker = 'X';
            game.mapBoard(tileId, marker, function() {
                if (game.checkWinCondition()) {
                    console.log('Game over!', game.winner, 'cross select');
                    game.updateWinnerToDom(game.winner);
                }

                
            });
            tile.removeEventListener('click', game.playerMove);
        },
        

        naughtSelect: function(tileId) {
          
            let tile = document.getElementById(tileId);
            tile.innerHTML = '<img src="images/o.svg" class="o-marker">';
            let marker = 'O'
            game.mapBoard(tileId, marker, function() {
                if (game.checkWinCondition()) {
                    console.log('Game over!', game.winner, 'cross select');
                    game.updateWinnerToDom(game.winner);
                }
            });
            
            

            tile.removeEventListener('click', game.playerMove);
        },

        playerSelect: function(tileId, marker) {
            
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

            if (typeof callback === 'function') {
                callback();
            }
            
        },

        getTilePosition: function(tileId) {
            switch (tileId) {
                case 'r1c1':
                    return [0, 0];
                case 'r1c2':
                    return [0, 1];
                case 'r1c3':
                    return [0, 2];
                case 'r2c1':
                    return [1, 0];
                case 'r2c2':
                    return [1, 1];
                case 'r2c3':
                    return [1, 2];
                case 'r3c1':
                    return [2, 0];
                case 'r3c2':
                    return [2, 1];
                case 'r3c3':
                    return [2, 2];
            }
        },

        

        startGame: function() {
            game.bindBoardTiles();
            game.gameMessage.textContent = '';
            game.gameOver = false;
            game.winner = null;
            game.board = [[0, 0, 0],
                          [0, 0, 0],
                          [0, 0, 0]];
            let tiles = game.tile;
            tiles.forEach(function(tile) {
                tile.innerHTML = '';
            })
            game.bindBoardTiles();
            
                game.startingPlayer = game.decideStartingPlayer();

            
            

                game.isPlayerTurn = game.startingPlayer === 'player';

                console.log("Is player turn?", game.isPlayerTurn);

                if (game.isPlayerTurn) {
                    game.playerMarker = 'X';
                    game.computerMarker = 'O';
                    game.gameMessage.textContent = 'You start first!'
                    
                } else {
                    game.playerMarker = 'O';
                    game.computerMarker = 'X';
                }
                
                game.moveCounter = 0;
                

                game.playMove(game.isPlayerTurn);
            
        },
        
        // updateGameMessage: function(callback) {
        //     setTimeout(() => {
        //         callback();
        //     }, 1);
        // },

        computerMoveTimer: function(callback) {
            setTimeout(() => {
                callback();
            }, 500);
        },
        
        
        


        decideStartingPlayer: function() {
            let randomNumber = Math.random();
            if (randomNumber < 0.5) {
                // this.gameMessage.textContent = 'You start first with X'
                return "player";
            } else {
                // this.gameMessage.textContent = 'Computer starts first with X'
                return "computer";
            }
        },

        determineWhoToPlay: function() {

        },

        playMove: function(isPlayerTurn) {
            
            if (game.isPlayerTurn) {
                // Players turn
               
               




            } else {
                // computers turn
             
                game.computerMove();
              
            }

        
        },


        computerMove: function() {
            game.gameMessage.textContent = '';
            // if (game.isBoardFull()) { 
            //     return;
            // }
            
            if (game.winner !== null || game.gameOver) {
                console.log('Game over!', game.winner, 'TEST', 'computer move function')
                game.gameOver = true;
                return;
            }
            
                // gets the tile it will select
                let tile = game.getComputerMove.moveZero();

                let coordinates = game.getTilePosition(tile);
                let row = coordinates[0];
                let col = coordinates[1];
                // if tile is empty, select
                if (game.board[row][col] === 0) {
                    game.mapBoard(tile, game.computerMarker);
                    game.computerMoveTimer(function() {
                        if (game.computerMarker === 'X') {
                            game.crossSelect(tile);
                        } else 
                            game.naughtSelect(tile);
                    })
                game.checkWinCondition();
                } else {
                    // try again
                    game.computerMove();
                }

             
                if (game.isBoardFull()) {
                    return;
                }

                // if (!game.gameOver) {
                //     game.checkWinCondition();
                // }
                
                game.isPlayerTurn = true;
                
            
            
        },


        isBoardFull: function() {
            
            for (let i = 0; i < game.board.length; i++) {
                for (let j = 0; j < game.board[i].length; j++) {
                    if (game.board[i][j] === 0) {
                        return false;
                    }
                }
            }
            console.log('board full')
            return true; 
        },
        
        
        
        getComputerMove: {
            moveZero: function() {
                let index = Math.floor(Math.random() * 9);
                let tileId;
                switch (index) {
                    case 0:
                        tileId = 'r1c1';
                        break;
                    case 1:
                        tileId = 'r1c2';
                        break;
                    case 2:
                        tileId = 'r1c3';
                        break;
                    case 3:
                        tileId = 'r2c1';
                        break;
                    case 4:
                        tileId = 'r2c2';
                        break;
                    case 5:
                        tileId = 'r2c3';
                        break;
                    case 6:
                        tileId = 'r3c1';
                        break;
                    case 7:
                        tileId = 'r3c2';
                        break;
                    case 8:
                        tileId = 'r3c3';
                        break;
                    default:
                        tileId = '';
                        break;
                }
                return tileId;
            }
        },

        checkWinCondition: function() {
            console.log('call checkWinCondition')
            let board = game.board;
            let player = game.playerMarker;
            let computer = game.computerMarker;
            let winner = game.winner
          
            
            for (let i = 0; i < 3; i++) {
                // Check rows
                if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                    game.endGameRemoveBinds();
                    if (board[i][0] === player) {
                        game.winner = 'Player';
                       
                        game.gameOver = true;
                    } else {
                        game.winner = 'Computer'
                        }
                        console.log('Winner is', game.winner, 'check win condition');
                    game.updateWinnerToDom(game.winner);
                    game.updateScoreCounter();
                    return true;
                }
                // Check columns
                if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                    game.endGameRemoveBinds();
                    if (board[0][i] === player) {
                    game.winner = 'Player'
                    
                    game.gameOver = true;
                    } else {
                        game.winner = 'Computer'
                        }
                    console.log('Winner is', game.winner, 'check win condition');
                    game.updateScoreCounter();
                    game.updateWinnerToDom(game.winner);
                    return true;
                }
            }
        
            // Check diagonals
            if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                game.endGameRemoveBinds();
                if (board[0][0] === player) {
                    game.winner = 'Player'
                   
                    game.gameOver = true;
                } else {
                    game.winner = 'Computer'
                }
                console.log('Winner is', game.winner, 'check win condition');
                game.updateWinnerToDom(game.winner);
                game.updateScoreCounter();
                return true;
            }
            if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
                game.endGameRemoveBinds();
                if (board[0][2] === player) {
                    game.winner = 'Player'
                    
                    game.gameOver = true;
                } else {
                    game.winner = 'Computer'
                }
                console.log('Winner is', game.winner, 'check win condition');
                game.updateWinnerToDom(game.winner);
                game.updateScoreCounter();
                return true;
            }

            // if (game.isBoardFull()) {
            //     winner = 'Tie'
            //     console.log('board full, it is a ', winner)
            // }
            
            return false;
        },
        

        endGameRemoveBinds: function() {
            if (!game.gameEnded) { // Check if the game has already ended
                let tiles = this.tile;
                tiles.forEach(function(tile) {
                    tile.removeEventListener('click', game.playerMove);
                });
            }
        },

        updateWinnerToDom: function(winner) {
                game.computerMoveTimer(function() {
                    game.gameMessage.textContent = `Winner is ${winner}`;
                });
                
            
            
        },

        updateDomWhoToMove: function() {
            if (game.isPlayerTurn === true) {
            game.gameMessage.textContent = 'Your turn to move';
            } else {game.gameMessage.textContent = ''}
        },

        updateScoreCounter: function() {
            if (game.winner === 'Player') {
                game.playerScore++;
                game.playerScoreMessage.textContent = `Player score: ${game.playerScore}`;
            } else if (game.winner === 'Computer') {
                game.computerScore++;
                game.computerScoreMessage.textContent = `Computer score: ${game.computerScore}`
            }

        }

       
        

        

       // Remove click listeners when computer is deciding move and re-add them when 
       // decision is made
        
            
        

       
    

    };

    game.init();
})();



