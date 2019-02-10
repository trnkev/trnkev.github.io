var bands = ["Blondie", "Prince", "Tavares", "Chic", 
             "SuperMax", "Rick James", "Michael Jackson", "Bee Gees",
             "Gloria Gaynor", "The Pointer Sisters", "Donna Summer", "Diana Ross"];

var wins = 0;
var losses = 0;
var tries = 12;
var guesses = "";
var startGame = false;
var repeated = false;
var incorrectLetters = [];

function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var computerGuess = random(bands).toLowerCase();

function drawUnderscore(word) {
     var underscores = [];
     var display = "";
    for (var i = 0; i < word.length; i++) {
        if (word[i] === " ") {
            underscores.push(" ");
        } else {
            underscores.push("_");
        }
        display += underscores[i] + "&nbsp;"
    }
    document.getElementById("word").innerHTML = display;
    return underscores;
}

function checkDone(array, word) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== word[i]) return false;
    }
    return true;
}

var secret = drawUnderscore(computerGuess);

function updateUnderscores(array) {
    var display = "";
    for (item of array) {
        display += item + "&nbsp;";
    }
    document.getElementById("word").innerHTML = display;
}

function gameReset() {
    guesses = "";
    userGuess = "";
    tries = 12;
    computerGuess = random(bands).toLowerCase();
    secret = drawUnderscore(computerGuess);
    document.getElementById("tries").textContent = tries;
    incorrectLetters = [];
}

document.onkeyup = function(event) {
    var userGuess = event.key.toLowerCase();
    var correctLetter = false;
    repeated = false;

    if (!startGame) {
        var parent = document.getElementById("parent");
        var child = document.getElementById("initial-text");
        parent.removeChild(child);
        startGame = true;
        correctLetter = true;
        userGuess = "";
    }

    // checks if letters are repeated
    for (var i = 0; i < incorrectLetters.length; i++) {
        if (userGuess === incorrectLetters[i]) {
            repeated = true;
            break;
        } 
    }

    // Checks letter of user's guess to word in computer's mind
    for (var i = 0; i < computerGuess.length; i++) {
        if (userGuess === computerGuess[i]) {
            correctLetter = true;
            secret[i] = userGuess;
            updateUnderscores(secret);
        } 
    }

    if (!correctLetter && !repeated) {
        if (guesses.length > 0) {
            guesses += ', ';
        }
        incorrectLetters.push(userGuess);
        guesses += userGuess;
        --tries;
    } 

    var triesText = document.getElementById("tries");
    triesText.textContent = tries;

    if (tries <= 0) {
        ++losses;
        gameReset();
    }

    if (checkDone(secret,computerGuess)) {
        ++wins;
        document.getElementById("image").src = "assets/images/" + computerGuess +  ".jpg";
        gameReset();
    }

    var winsText = document.getElementById("wins");
    winsText.textContent = wins;

    var lossesText = document.getElementById("losses");
    lossesText.textContent = losses;

    var userGuessesText = document.getElementById("guesses");
    userGuessesText.textContent = guesses;


};