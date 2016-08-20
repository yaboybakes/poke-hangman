var HANGMAN = function() {
            
            var tries = 15;
            var game = document.getElementById('hangman');
            var game_guesses = document.getElementById('guesses');
            var game_tries = document.getElementById('tries');
            var names = ["pikachu","squirtle","charmander","bulbasaur","mewtwo","zapdos","articuno","moltres"];
            var index = Math.floor(Math.random() * names.length);
            var game_board = new Array(names[index].length);
            var attempted_guesses = "";
            var correct_guess = false;
            var already_guessed = true;
            var solution_length = names[index].length;
            game_guesses.innerHTML = "";
            game_tries.innerHTML = "";

            for (var i = 0; i < names[index].length; i++){
                 game_board[i] = "_";

            }
            
            game.innerHTML = game_board.join(" ");

            document.onkeyup = function(event) {
                
               var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

               //check to see if user already attempted this guess
               if (attempted_guesses.indexOf(userGuess) == -1) {
                   attempted_guesses += userGuess;
                   if (names[index].indexOf(userGuess) != -1) {
                    correct_guess = true;
                   }
                   tries_update();
                   guesses_update();
               } else {
                   already_guessed = true;
                   correct_guess = false;
                   guesses_update();
                   tries_update();
                   
               }

               //if user guessed a correct letter
               if (correct_guess) {
                  //update hangman game
                   hangman_update(userGuess);
                   if (solution_length == 0) {
                       alert("You Win!");
                       var wins = document.getElementById('wins').nodeValue;
                       document.getElementById('wins').innerHTML = wins + 1;
                       reset_game();
                   }
               }
                   
                   
                  
            }

            var hangman_update = function(userGuess) {
                
                for (var i = 0; i < names[index].length; i++) {
                    if (userGuess == names[index][i]) {
                        game_board[i] = userGuess;
                        solution_length--;
                    }
                }
                game.innerHTML = game_board.join(" ");
                correct_guess = false;
                already_guessed = false;
                
            }

            var guesses_update = function() {
                game_guesses.innerHTML = "Letters you have already tried \n" + attempted_guesses;
            }

            var tries_update = function() {
                if (already_guessed){
                    if (tries == 0) {
                        alert("You Lose! The word was " + names[index]);
                        //game.innerHTML = names[index];
                        var losses = document.getElementById('losses').nodeValue;
                        document.getElementById('losses').innerHTML = losses + 1;
                        reset_game();
                    }
                if (tries == 15){
                    tries--;
                }
                game_tries.innerHTML = "You have " + tries + " guesses left!";
                already_guessed = false;
                } else {
                    tries--;
                if (tries == 0) {
                        alert("You Lose! The word was " + names[index]);
                        //game.innerHTML = names[index];
                        var losses = document.getElementById('losses').nodeValue;
                        document.getElementById('losses').innerHTML = losses + 1;
                        reset_game();
                    }
                game_tries.innerHTML = "You have " + tries + " guesses left!";
                }
            }
            
            var reset_game = function() {
                game_guesses.innerHTML = " ";
                game_tries.innerHTML = " ";
                HANGMAN();
            }
            
            var display_board = function() {
                var display = "";
                for (var i = 0; i < names[index].length; i++){
                 display+= game_board[i];

                }
                game.innerHTML = display;
            }
        
    }
    HANGMAN();