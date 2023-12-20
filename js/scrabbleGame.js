/*File: scrabbleGame.js
    GUI Assignment: Implementing a Bit of Scrabble with Drag and Drop
    This website displays one line of the Scrabble Board to the user along with seven letter tiles on a tile rack. The user drags tiles to the board to make a word and their score is calculated. 
    Mustapha Ayad, UMass Lowell Computer Science, mustapha_ayad@student.uml.edu
    Copyright (c) 2023 by Paschal. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author. updated by MA on December 20th, 2021 at 3:00 AM*/

//array containing ScrabbleTiles with distribution
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

//globals
var score = 0;
var totalScore = 0;
var doubleWordFlag = 0;
var  lettersUsed = 7;

function createNewTiles() {
    var elements = document.getElementsByClassName("letter");
    //https://stackoverflow.com/questions/10842471/how-to-remove-all-elements-of-a-certain-class-from-the-dom
    //removes all letters on board and on rack
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    //https://www.coderrocketfuel.com/article/generate-a-random-letter-from-the-alphabet-using-javascript
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var l1 = alphabet[Math.floor(Math.random() * alphabet.length)];
    var l2 = alphabet[Math.floor(Math.random() * alphabet.length)];
    var l3 = alphabet[Math.floor(Math.random() * alphabet.length)];
    var l4 = alphabet[Math.floor(Math.random() * alphabet.length)];
    var l5 = alphabet[Math.floor(Math.random() * alphabet.length)];
    var l6 = alphabet[Math.floor(Math.random() * alphabet.length)];
    var l7 = alphabet[Math.floor(Math.random() * alphabet.length)];
    //create new tiles on the rack
    var newTiles = '<img data-letter="' + l1 + '"id="letter1" class="letter" src="pic/Scrabble_Tiles/Scrabble_Tile_' + l1 + '.jpg"><img data-letter="' + l2 + '"id="letter2" class="letter" src="pic/Scrabble_Tiles/Scrabble_Tile_' + l2 + '.jpg"><img data-letter="' + l3 + '" id="letter3" class="letter" src="pic/Scrabble_Tiles/Scrabble_Tile_' + l3 + '.jpg"><img data-letter="' + l4 + '"id="letter4" class="letter" src="pic/Scrabble_Tiles/Scrabble_Tile_' + l4 + '.jpg"><img data-letter="' + l5 + '"id="letter5" class="letter" src="pic/Scrabble_Tiles/Scrabble_Tile_' + l5 + '.jpg"><img data-letter="' + l6 + '"id="letter6" class="letter" src="pic/Scrabble_Tiles/Scrabble_Tile_' + l6 + '.jpg"><img data-letter="' + l7 + '"id="letter7" class="letter" src="pic/Scrabble_Tiles/Scrabble_Tile_' + l7 + '.jpg">';
    var rack = document.getElementById('rack');
    rack.innerHTML = newTiles;
    // make the new tiles draggable, but if they are dropped at an invalid location, they will bounce back
    $(".letter").draggable({
        revert: 'invalid'
    });
}

function nextWord() {
    //checks to see how many doubleWord scores the user earned
    if (doubleWordFlag === 0) {
        totalScore += score;
    } else if (doubleWordFlag === 1) {
        totalScore += score * 2;

    } else if (doubleWordFlag === 2) {
        totalScore += score * 4;
    }
    //reset the word score
    score = 0;
    doubleWordFlag = 0;
    //update the word and total score on the website
    var fillTotalScore = " " + totalScore;
    var total_score = document.getElementById('totalScore');
    var word_score = document.getElementById('score');
    word_score.innerHTML = "0";
    total_score.innerHTML = fillTotalScore;
    createNewTiles();
}

function restart() {
    //reset the word and total score on the website
    totalScore = 0;
    score = 0;
    doubleWordFlag = 0;
    lettersUsed = 7;
    var total_score = document.getElementById('totalScore');
    var word_score = document.getElementById('score');
    var letters = document.getElementById('reminders');
    word_score.innerHTML = "0";
    total_score.innerHTML = "___";
    letters.innerHTML = "7";
    createNewTiles();


}
// ... [Previous code, including ScrabbleTiles array and other global variables]






$(document).ready(
    function () {
        //https://www.geeksforgeeks.org/jquery-ui-draggable-revertduration-option/
        //https://www.youtube.com/watch?v=peWrZD0meTs
        $(".letter").draggable({
            revert: 'invalid'
        });
        $("#rack").droppable({
            accept: ".letter",
            drop: function (event, ui) {
                // Check if the tile was previously on the board
        if (ui.draggable.hasClass("OnBoard")) {
            // Tile was on the board, now moved back to the rack
            ui.draggable.removeClass("OnBoard").css("left", 0).css('top', 0);

            // Check and update double word flag if necessary
            if (ui.draggable.hasClass("doubleWord")) {
                ui.draggable.removeClass("doubleWord");
                doubleWordFlag -= 1;  // Only decrement if tile was on a double word spot
                
                
                //remove letter score from word score if tile dragged back to rack
                lettersUsed--;
                score -= ScrabbleTiles[ui.draggable.attr('data-letter')].value;
                if (doubleWordFlag === 0 || doubleWordFlag < 0 ) {
                    var fill_score = " " + score;
                } else if (doubleWordFlag === 1) {
                    var fill_score = " " + score * 2;
                } else if (doubleWordFlag === 2) {
                    var fill_score = " " + score * 4;
                }
                var word_score = document.getElementById('score');
                word_score.innerHTML = fill_score;
                var letters = document.getElementById('reminders');
                letters.innerHTML = lettersUsed;   

            }
        } else {
            // Tile was not on the board, just adjust its position
            ui.draggable.css("left", 0).css('top', 0);
        }
                var fill_score = " " + score;
                var word_score = document.getElementById('score');
                word_score.innerHTML = fill_score;
                var letters = document.getElementById('reminders');
                letters.innerHTML = lettersUsed; 

            }
        });
        $(".tile").droppable({
            accept: ".letter",
            accept: ".letter",
            drop: function (event, ui) {
                // Get the position of the board tile
                var boardTilePos = $(this).offset();
        
                // Position the draggable tile absolutely within the board tile
                ui.draggable.offset({
                    top: boardTilePos.top,
                    left: boardTilePos.left
                }).addClass("OnBoard");
                    
                    //if the board location is a doubleWord, signify that doubleWord bonus is in effect
                    if ($(this).attr('title') === 'doubleWord1') {
                        doubleWordFlag += 1;
                        ui.draggable.addClass("doubleWord");
                        lettersUsed++;
                    }
                    if ($(this).attr('title') === 'doubleWord2') {
                        doubleWordFlag += 1;
                        lettersUsed++;
                        ui.draggable.addClass("doubleWord");
                    }

                    score += ScrabbleTiles[ui.draggable.attr('data-letter')].value;
                    //update score with correct wordScore bonus 
                    if (doubleWordFlag === 0) {
                        var fill_score = " " + score;
                    } else if (doubleWordFlag === 1) {
                        var fill_score = " " + score * 2;

                    } else if (doubleWordFlag === 2) {
                        var fill_score = " " + score * 4;
                    }


                    var word_score = document.getElementById('score');
                    word_score.innerHTML = fill_score;
                    var letters = document.getElementById('reminders');
                    letters.innerHTML = lettersUsed; 

                }
            
        });
    });

