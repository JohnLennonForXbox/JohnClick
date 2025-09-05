import FixData from './save-fixer.js';

FixData();
// data fixer must run before we even think about touching the save file
// or something Evil will happen

import { JohnGrades } from './johngrades.js';
import { JohnAccessories } from './johnaccessories.js';
import GAMEINFO from './common.js';

let SavedJohnGrades = JSON.parse(localStorage.getItem("JohnGrades"));
let SavedJohnAccessory = JSON.parse(localStorage.getItem("JohnAccessories"));

document.getElementById("version").textContent = `John Lennon Clicker for Web v${GAMEINFO.GAMEVERSION}`;

let JohnsClicked = parseInt(localStorage.getItem("JohnScore")) || 0;
let EquippedLennon = Object.keys(SavedJohnGrades).find(name => SavedJohnGrades[name].Equipped) || "John Lennon";
let EquippedAccessory = Object.keys(SavedJohnAccessory).find(name => SavedJohnAccessory[name].Equipped) || "None";
let BaseJohntiplier = JohnAccessories[EquippedAccessory].Johntiplier || 1;
let JohnsPerClick = JohnGrades[EquippedLennon].JohnClicks;

const JohnSound =  new Audio('./audio/John lennon.wav');

const button = document.getElementById('JohnLennon');
console.log(button);
const heading = document.getElementById('JohnsClicked');
const johntiplierHeading = document.getElementById('JohnMultiplier');

heading.textContent = `Johns clicked: ${JohnsClicked.toLocaleString()}`;

button.addEventListener('click', () => {
    ClickJohn();
});
button.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Prevents the default right-click context menu
});

function ClickJohn() {
    JohnsClicked += JohnsPerClick * BaseJohntiplier;
    localStorage.setItem("JohnScore", JohnsClicked);
    heading.textContent = `Johns clicked: ${JohnsClicked.toLocaleString()}`;
    PlayJohnSound();
}

function SetJohnsClicked(amount) {
    JohnsClicked = amount;
    localStorage.setItem("JohnScore", JohnsClicked);
    heading.textContent = `Johns clicked: ${JohnsClicked.toLocaleString()}`;
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

function ExportData() {
    let save = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(key);
        if (!key.includes("eruda") && key !== "lastOpenedVersion") {
            const value = localStorage.getItem(key);
            save[key] = value;
        }
    }

    const stringed = JSON.stringify(save);
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(stringed);

    let binaryString = "";
    for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
    }

    const encodedUnicodeString = btoa(binaryString);

    if (navigator.clipboard) {
        navigator.clipboard.writeText(encodedUnicodeString).then(() => {
            alert("Data exported to clipboard!");
        }
        ).catch(err => {
            alert("Failed to copy data to clipboard: ", err);
        });
    } else {
        prompt("Copy your data:", encodedUnicodeString);
    }    
}

function ImportData() {
    const encodedUnicodeString = prompt("Paste your data here:");
    if (!encodedUnicodeString) {
        return;
    }
    try {
        const binaryString = atob(encodedUnicodeString);
        const uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder();
        const stringed = decoder.decode(uint8Array);
        const parsed = JSON.parse(stringed);
        localStorage.clear();
        for (const key in parsed) {
            localStorage.setItem(key, parsed[key]);
        }
        location.reload();
    } catch (e) {
        alert("Failed to import data: " + e);
    }
}

window.ExportData = ExportData;
window.ImportData = ImportData;

function PlayJohnSound() {
    JohnSound.playbackRate = Math.random() * (2.0 - 0.5) + 0.5;
    console.log(JohnSound.playbackRate);
    JohnSound.play();
}

function EquipJohn(name) {
    SavedJohnGrades[EquippedLennon].Equipped = false;
    console.log(EquippedLennon, SavedJohnGrades);
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

// This code reeks but I don't really care to rewrite it
const AccessoryContainer = document.getElementById('AccessoryContainer');
const JohngradeContainer = document.getElementById('JohngradeContainer');
for (const name in JohnAccessories) {
    const Johngrade = document.createElement('div');
    Johngrade.className = 'Johngrade';
    // This code is why I needed to rewrite saves Lmfao
    // I don't really know how you could exploit it but better safe than sorry
    Johngrade.innerHTML = `
        <button class="${SavedJohnAccessory[name].Owned ? "owned" : ''} ${SavedJohnAccessory[name].Equipped ? "equipped" : '' }" id="${name}">
            <h3>${name}</h3>
            <img src="${JohnAccessories[name].Image}" alt="${name}" class="Johngrade-image">
            <p>${JohnAccessories[name].Description}</p>
            <p>Price: ${JohnAccessories[name].Price.toLocaleString()} Johns</p>
            <p>Johntiplier: ${JohnAccessories[name].Johntiplier}</p>
        </button>
    `
    AccessoryContainer.appendChild(Johngrade);
    Johngrade.addEventListener('click', () => {
        if (!SavedJohnAccessory[name].Owned && JohnsClicked >= JohnAccessories[name].Price) {
            JohnsClicked -= JohnAccessories[name].Price;
            heading.textContent = `Johns clicked: ${JohnsClicked.toLocaleString()}`;
            SavedJohnAccessory[name].Owned = true;
            document.getElementById(name).classList.add('owned');
            localStorage.setItem("JohnAccessories", JSON.stringify(SavedJohnAccessory));
            localStorage.setItem("JohnScore", JohnsClicked);
        } else if (SavedJohnAccessory[name].Owned && !SavedJohnAccessory[name].Equipped) {
            EquipJohnAccessory(name);
        }
    });
}

for (const name in JohnGrades) {
    const Johngrade = document.createElement('div');
    Johngrade.className = 'Johngrade';
    // This code is why I needed to rewrite saves Lmfao
    // I don't really know how you could exploit it but better safe than sorry
    Johngrade.innerHTML = `
        <button class="${SavedJohnGrades[name].Owned ? "owned" : ''} ${SavedJohnGrades[name].Equipped ? "equipped" : '' }" id="${name}">
            <h3>${name}</h3>
            <img src="${JohnGrades[name].Image}" alt="${name}" class="Johngrade-image">
            <p>${JohnGrades[name].Description}</p>
            <p>Price: ${JohnGrades[name].Price.toLocaleString()} Johns</p>
            <p>Johns per click: ${JohnGrades[name].JohnClicks.toLocaleString()}</p>
        </button>
    `
    JohngradeContainer.appendChild(Johngrade);
    Johngrade.addEventListener('click', () => {
        if (!SavedJohnGrades[name].Owned && JohnsClicked >= JohnGrades[name].Price) {
            JohnsClicked -= JohnGrades[name].Price;
            heading.textContent = `Johns clicked: ${JohnsClicked.toLocaleString()}`;
            SavedJohnGrades[name].Owned = true;
            document.getElementById(name).classList.add('owned');
            localStorage.setItem("JohnGrades", JSON.stringify(SavedJohnGrades));
            localStorage.setItem("JohnScore", JohnsClicked);
        } else if (SavedJohnGrades[name].Owned && !SavedJohnGrades[name].Equipped) {
            EquipJohn(name);
        }
    });
}


console.log(EquippedLennon);
JohnsPerClick = JohnGrades[EquippedLennon].JohnClicks;
document.getElementById('JohnLennonImage').src = JohnGrades[EquippedLennon].Image;
document.getElementById(EquippedLennon).classList.add('equipped');

document.getElementById('AccessoryImage').src = JohnAccessories[EquippedAccessory].Image;
document.getElementById(EquippedAccessory).classList.add('equipped');
johntiplierHeading.textContent = `Johntiplier: ${BaseJohntiplier}x`;
