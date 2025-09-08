// Welcome to my web scripts,,,
// Take a look around,,, LEarn something MDN doesn't want you to know,,,,
// If you want to cheat just run window.SetJohnsClicked(9 kojillion) in the console,,,,

import FixData from './save-fixer.js';

FixData();
// data fixer must run before we even think about touching the save file
// or something Evil will happen

import { JohnGrades } from './johngrades.js';
import { JohnAccessories } from './johnaccessories.js';
import GAMEINFO from './common.js';
import { UpdateJohnScore, SaveJohnScore, GetJohnScore, } from './modules/GameCoordinator.js';
import { ExportData, ImportData, ResetData } from './modules/Saveinator.js';

let SavedJohnGrades = JSON.parse(localStorage.getItem("JohnGrades"));
let SavedJohnAccessory = JSON.parse(localStorage.getItem("JohnAccessories"));

document.getElementById("version").textContent = `John Lennon Clicker for Web v${GAMEINFO.GAMEVERSION}`;

let JohnsClicked = GetJohnScore()
let EquippedLennon = Object.keys(SavedJohnGrades).find(name => SavedJohnGrades[name].Equipped) || "John Lennon";
let EquippedAccessory = Object.keys(SavedJohnAccessory).find(name => SavedJohnAccessory[name].Equipped) || "None";
let BaseJohntiplier = JohnAccessories[EquippedAccessory].Johntiplier || 1;
let JohnsPerClick = JohnGrades[EquippedLennon].JohnClicks;

const JohnSound =  new Audio('./audio/John lennon.wav');

const button = document.getElementById('JohnLennon');
const johntiplierHeading = document.getElementById('JohnMultiplier');


button.addEventListener('click', () => {
    PlayJohnSound();
    JohnsClicked = UpdateJohnScore(JohnsClicked + JohnsPerClick * BaseJohntiplier);
});
button.addEventListener('keydown', (key) => {
    if (key.key === "Enter" ) {
        key.preventDefault();
    }
})
button.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});


function SetJohnsClicked(amount) {
    JohnsClicked = UpdateJohnScore(amount);
    console.log("okie dokie artichokey")
}

window.SetJohnsClicked = SetJohnsClicked;

function PlayJohnSound() {
    JohnSound.playbackRate = Math.random() * (2.5 - 0.1) + 0.1;
    JohnSound.play();
}

function EquipJohn(name) {
    SavedJohnGrades[EquippedLennon].Equipped = false;
    document.getElementById(EquippedLennon).classList.remove('equipped');
    EquippedLennon = name;
    SavedJohnGrades[EquippedLennon].Equipped = true;
    JohnsPerClick = JohnGrades[EquippedLennon].JohnClicks;
    document.getElementById('JohnLennonImage').src = JohnGrades[EquippedLennon].Image;
    document.getElementById(EquippedLennon).classList.add('equipped');
    localStorage.setItem("JohnGrades", JSON.stringify(SavedJohnGrades));
}

function EquipJohnAccessory(name) {
    SavedJohnAccessory[EquippedAccessory].Equipped = false;
    document.getElementById(EquippedAccessory).classList.remove('equipped');
    EquippedAccessory = name;
    SavedJohnAccessory[name].Equipped = true;
    BaseJohntiplier = JohnAccessories[EquippedAccessory].Johntiplier;
    johntiplierHeading.textContent = `Johntiplier: ${BaseJohntiplier}x`;
    document.getElementById('AccessoryImage').src = JohnAccessories[EquippedAccessory].Image;
    document.getElementById(EquippedAccessory).classList.add('equipped');
    localStorage.setItem("JohnAccessories", JSON.stringify(SavedJohnAccessory));
}

function createItemButton({ name, item, saved, type, onClick }) {
    const button = document.createElement('button');
    button.className = [
        saved[name].Owned ? 'owned' : '',
        saved[name].Equipped ? 'equipped' : ''
    ].join(' ').trim();
    button.id = name;

    button.innerHTML = `
        <h3>${name}</h3>
        <img src="${item.Image}" alt="${name}" class="Johngrade-image">
        <p>${item.Description}</p>
        <p>Price: ${item.Price.toLocaleString()} Johns</p>
        ${type === 'accessory'
            ? `<p>Johntiplier: ${item.Johntiplier}</p>`
            : `<p>Johns per click: ${item.JohnClicks.toLocaleString()}</p>`
        }
    `;

    button.addEventListener('click', () => onClick(name));
    return button;
}

function renderItems({ container, items, saved, type, onClick }) {
    for (const name in items) {
        const wrapper = document.createElement('div');
        wrapper.className = 'Johngrade';
        const button = createItemButton({ name, item: items[name], saved, type, onClick });
        wrapper.appendChild(button);
        container.appendChild(wrapper);
    }
}

const AccessoryContainer = document.getElementById('AccessoryContainer');
const JohngradeContainer = document.getElementById('JohngradeContainer');

renderItems({
    container: AccessoryContainer,
    items: JohnAccessories,
    saved: SavedJohnAccessory,
    type: 'accessory',
    onClick: (name) => {
        if (!SavedJohnAccessory[name].Owned && JohnsClicked >= JohnAccessories[name].Price) {
            JohnsClicked = UpdateJohnScore(JohnsClicked - JohnAccessories[name].Price);
            SavedJohnAccessory[name].Owned = true;
            document.getElementById(name).classList.add('owned');
            localStorage.setItem("JohnAccessories", JSON.stringify(SavedJohnAccessory));
        } else if (SavedJohnAccessory[name].Owned && !SavedJohnAccessory[name].Equipped) {
            EquipJohnAccessory(name);
        }
    }
});

renderItems({
    container: JohngradeContainer,
    items: JohnGrades,
    saved: SavedJohnGrades,
    type: 'grade',
    onClick: (name) => {
        if (!SavedJohnGrades[name].Owned && JohnsClicked >= JohnGrades[name].Price) {
            JohnsClicked = UpdateJohnScore(JohnsClicked - JohnGrades[name].Price);
            SavedJohnGrades[name].Owned = true;
            document.getElementById(name).classList.add('owned');
            localStorage.setItem("JohnGrades", JSON.stringify(SavedJohnGrades));
        } else if (SavedJohnGrades[name].Owned && !SavedJohnGrades[name].Equipped) {
            EquipJohn(name);
        }
    }
});

JohnsPerClick = JohnGrades[EquippedLennon].JohnClicks;
document.getElementById('JohnLennonImage').src = JohnGrades[EquippedLennon].Image;
document.getElementById(EquippedLennon).classList.add('equipped');

document.getElementById('AccessoryImage').src = JohnAccessories[EquippedAccessory].Image;
document.getElementById(EquippedAccessory).classList.add('equipped');
johntiplierHeading.textContent = `Johntiplier: ${BaseJohntiplier}x`;
