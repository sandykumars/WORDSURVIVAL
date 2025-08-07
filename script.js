let levels = [
    { category: "Programming Languages", words: ["python", "java", "ruby", "swift", "kotlin", "dart", "csharp", "golang", "rust", "php"], hint: "Popular coding languages" },
    { category: "Global Languages", words: ["english", "spanish", "french", "german", "chinese", "japanese", "hindi", "arabic", "portuguese", "russian"], hint: "Widely spoken languages" },
    { category: "Car Brands", words: ["toyota", "ford", "honda", "bmw", "audi", "mercedes", "tesla", "nissan", "hyundai", "chevrolet"], hint: "Popular car manufacturers" },
];

let selectedWord, guessedWord, attemptsLeft, timeLeft, timerInterval;

function startGame() {
    document.querySelector(".start").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    initGame();
}

function initGame() {
    let level = levels[Math.floor(Math.random() * levels.length)];
    selectedWord = level.words[Math.floor(Math.random() * level.words.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    attemptsLeft = 6;
    timeLeft = 60;

    document.getElementById("wordDisplay").innerText = guessedWord.join(" ");
    document.getElementById("attempts").innerText = attemptsLeft;
    document.getElementById("timer").innerText = timeLeft;
    document.getElementById("hint").innerText = level.hint;
    document.getElementById("message").innerText = "";
    document.getElementById("letters").innerHTML = "";
    document.querySelector(".restart").style.display = "inline-block";
    document.querySelector(".next-level").style.display = "none";

    for (let i = 97; i <= 122; i++) {
        let button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        button.onclick = () => checkLetter(button);
        document.getElementById("letters").appendChild(button);
    }

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (--timeLeft <= 0) endGame(false);
    document.getElementById("timer").innerText = timeLeft;
}

function checkLetter(button) {
    let letter = button.innerText;
    button.disabled = true;

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) guessedWord[i] = letter;
        }
    } else {
        attemptsLeft--;
    }

    document.getElementById("wordDisplay").innerText = guessedWord.join(" ");
    document.getElementById("attempts").innerText = attemptsLeft;

    if (!guessedWord.includes("_")) endGame(true);
    if (attemptsLeft === 0) endGame(false);
}

function endGame(win) {
    clearInterval(timerInterval);
    document.getElementById("message").innerText = win
        ? "Congratulations! You won!"
        : `Game Over! The word was "${selectedWord}".`;

    document.querySelectorAll(".letters button").forEach(button => button.disabled = true);

    if (win) document.querySelector(".next-level").style.display = "inline-block";
}

function restartGame() {
    initGame();
}

function nextLevel() {
    initGame();
}
