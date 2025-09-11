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
const BearAlarm =  new Audio('./audio/alarm.mp3');
BearAlarm.loop = true;
BearAlarm.playbackRate = 2;
BearAlarm.volume = 0.2;
const BearArrive = new Audio('./audio/bear5-arrival.wav');
BearArrive.volume = 0.2;
const BearLoop = new Audio('./audio/bearLoop.wav');
BearLoop.volume = 0.2;
BearLoop.loop = true;
const BearClick = new Audio('./audio/Bonk.wav');

const button = document.getElementById('JohnLennon');
const BEAR5 = document.getElementById("BEAR5");
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
BEAR5.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitUntil(conditionFunction, interval = 100) {
  return new Promise(resolve => {
    if (conditionFunction()) {
      resolve();
      return;
    }

    const intervalId = setInterval(() => {
      if (conditionFunction()) {
        clearInterval(intervalId);
        resolve();
      }
    }, interval);
  });
}


async function sendBEAR5() {
    if (JSON.parse(localStorage.getItem("settings")).BEAR5DisableSwitch) {
        console.log("BEAR 5 is disabled");
        return;
    }
    console.log("BEAR 5 IS COMING");
    if (!JSON.parse(localStorage.getItem("settings")).BEAR5EffectsSwitch) {
        document.body.classList.add("BEAR5-FLASH");
        document.body.classList.add("vignette-overlay");
    }
    const BEAR5TEXT = document.getElementById("BEAR5-TEXT");
    document.activeElement.blur();
    BearAlarm.play();
    BearArrive.play();
    BEAR5TEXT.innerText = "BEAR 5 IS COMING"
    BEAR5TEXT.classList.remove("hide");
    await sleep(5000);
    BearLoop.play();
    let BEAR5HEALTH = 100 + (JohnsClicked * 0.5) / 5;
    BEAR5TEXT.innerText = BEAR5HEALTH.toLocaleString();
    BEAR5.classList.remove("hide");
    BEAR5.focus();
    BEAR5.onclick = () => {
        BEAR5HEALTH -= (JohnsPerClick / 2) * (BaseJohntiplier * 0.8);
        BEAR5TEXT.innerText = BEAR5HEALTH.toLocaleString();
        BearClick.play();
    }
    await waitUntil(() => {return BEAR5HEALTH <= 0}, 0.1)
    BEAR5.classList.add("hide");
    BEAR5TEXT.classList.add("hide");
    if (!JSON.parse(localStorage.getItem("settings")).BEAR5EffectsSwitch) {
        document.body.classList.remove("BEAR5-FLASH");
        document.body.classList.remove("vignette-overlay");
    }
    BearAlarm.pause();
    BearLoop.pause();
}

async function startBear5() {
    if (JSON.parse(localStorage.getItem("settings")).BEAR5DisableSwitch) {
        console.log("BEAR 5 is disabled");
        return;
    }
    while (1) {
        await sleep(Math.floor(Math.random() * (75000 - 50000 + 1)) + 50000)
        await sendBEAR5();
        if (JSON.parse(localStorage.getItem("settings")).BEAR5DisableSwitch) {
            console.log("BEAR 5 is disabled");
            return;
        }
    }   
}

window.startBear5 = startBear5
window.sendBEAR5 = sendBEAR5

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

if (!JSON.parse(localStorage.getItem("settings")).BEAR5DisableSwitch) {
    startBear5();
}