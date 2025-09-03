import JohnGrades from './johngrades.js';

let JohnsClicked = 0;
let EquippedLennon = "John Lennon";
let JohnsPerClick = 1;

const button = document.getElementById('JohnLennon');
console.log(button);
const heading = document.getElementById('JohnsClicked');
button.addEventListener('click', () => {
    ClickJohn();
});
button.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Prevents the default right-click context menu
});

function ClickJohn() {
    JohnsClicked += JohnsPerClick;
    heading.textContent = `Johns clicked: ${JohnsClicked}`;
    PlayJohnSound();
}

function PlayJohnSound() {
    const JohnSound =  new Audio('./audio/John lennon.wav');
    JohnSound.playbackRate = Math.random() * (2.0 - 0.5) + 0.5;
    console.log(JohnSound.playbackRate);
    JohnSound.play();
}

const JohngradeContainer = document.getElementById('JohngradeContainer');
for (const name in JohnGrades) {
    const Johngrade = document.createElement('div');
    Johngrade.className = 'Johngrade';
    Johngrade.innerHTML = `
        <button class="${JohnGrades[name].Owned ? "owned" : ''} ${JohnGrades[name].Equipped ? "equipped" : '' }" id="${name}">
            <h3>${name}</h3>
            <img src="${JohnGrades[name].Image}" alt="${name}" class="Johngrade-image">
            <p>${JohnGrades[name].Description}</p>
            <p>Price: ${JohnGrades[name].Price} Johns</p>
            <p>Johns per click: ${JohnGrades[name].JohnClicks}</p>
        </button>
    `
    JohngradeContainer.appendChild(Johngrade);
    Johngrade.addEventListener('click', () => {
        if (!JohnGrades[name].Owned && JohnsClicked >= JohnGrades[name].Price) {
            JohnsClicked -= JohnGrades[name].Price;
            heading.textContent = `Johns clicked: ${JohnsClicked}`;
            JohnGrades[name].Owned = true;
            document.getElementById(name).classList.add('owned');
        } else if (JohnGrades[name].Owned && !JohnGrades[name].Equipped) {
            JohnGrades[EquippedLennon].Equipped = false;
            document.getElementById(EquippedLennon).classList.remove('equipped');
            EquippedLennon = name;
            JohnsPerClick = JohnGrades[name].JohnClicks;
            document.getElementById('JohnLennonImage').src = JohnGrades[name].Image;
            JohnGrades[name].Equipped = true;
            document.getElementById(name).classList.add('equipped');
        }
    });
}
