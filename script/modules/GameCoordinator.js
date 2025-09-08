// Manages the gam LMFAo
const JohnScoreElement = document.getElementById('JohnsClicked');

export function UpdateJohnScore(newScore) {
    newScore = parseFloat(newScore)
    if (isNaN(newScore)) {
        throw new TypeError("newScore is not a number")
    }
    JohnScoreElement.textContent = `Johns clicked: ${newScore.toLocaleString()}`;
    SaveJohnScore(newScore);
    return newScore;
}

export function SaveJohnScore(score) {
    localStorage.setItem("JohnScore", score);
}

export function GetJohnScore() {
    return parseFloat(localStorage.getItem("JohnScore")) || 0;
}

// Update the score when the game first loads

JohnScoreElement.textContent = `Johns clicked: ${GetJohnScore().toLocaleString()}`;
