import JohnGrades from './johngrades.js';

let JohnsClicked = parseInt(localStorage.getItem("JohnScore")) || 0;
let EquippedLennon = localStorage.getItem("EquippedJohn") || "John Lennon";
let JohnsPerClick = JohnGrades[EquippedLennon].JohnClicks;

const JohnSound =  new Audio('./audio/John lennon.wav');

const button = document.getElementById('JohnLennon');
console.log(button);
const heading = document.getElementById('JohnsClicked');

heading.textContent = `Johns clicked: ${JohnsClicked}`;

button.addEventListener('click', () => {
    ClickJohn();
});
button.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Prevents the default right-click context menu
});

function ClickJohn() {
    JohnsClicked += JohnsPerClick;
    localStorage.setItem("JohnScore", JohnsClicked);
    heading.textContent = `Johns clicked: ${JohnsClicked}`;
    PlayJohnSound();
}

function SetJohnsClicked(amount) {
    JohnsClicked = amount;
    localStorage.setItem("JohnScore", JohnsClicked);
    heading.textContent = `Johns clicked: ${JohnsClicked}`;
}

window.SetJohnsClicked = SetJohnsClicked;

function ResetData() {
    if (confirm("Are you sure you want to reset all your data? This action cannot be undone.")) {
        if (confirm("Are you REALLY sure you want to reset all your data? This action cannot be undone and your johns will be ground up into a fine paste.")) {
            localStorage.clear();
            location.reload();
        }
    }
}

window.ResetData = ResetData;

function PlayJohnSound() {
    JohnSound.playbackRate = Math.random() * (2.0 - 0.5) + 0.5;
    console.log(JohnSound.playbackRate);
    JohnSound.play();
}

function EquipJohn(name) {
    JohnGrades[EquippedLennon].Equipped = false;
    document.getElementById(EquippedLennon).classList.remove('equipped');
    EquippedLennon = name;
    JohnsPerClick = JohnGrades[name].JohnClicks;
    document.getElementById('JohnLennonImage').src = JohnGrades[name].Image;
    JohnGrades[name].Equipped = true;
    document.getElementById(name).classList.add('equipped');
    localStorage.setItem("EquippedJohn", EquippedLennon);
    localStorage.setItem("JohnGrades", JSON.stringify(JohnGrades));
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
            localStorage.setItem("JohnGrades", JSON.stringify(JohnGrades));
        } else if (JohnGrades[name].Owned && !JohnGrades[name].Equipped) {
            EquipJohn(name);
        }
    });
}

EquipJohn(EquippedLennon);
