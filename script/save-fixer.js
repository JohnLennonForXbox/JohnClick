import GAMEINFO from './common.js';

// This script fixes old save data to be compatible with the current version of the game
// For now this exists to fix the JohnGrades object to only store Owned and Equipped properties,
// patching a potential XSS vulnerability and reducing save size
// Also adds a lastOpenedVersion key to localStorage for more save patches later

function FixData() {
    if (localStorage.getItem('lastOpenedVersion') === null) {
        if (localStorage.getItem('JohnGrades') !== null) { 
            let newJohnGrades = {};
            let curJohnGrades = JSON.parse(localStorage.getItem('JohnGrades'))
            for (const key in curJohnGrades) {
                console.log(curJohnGrades[key]);
                Object.assign(newJohnGrades, { [key]: {Owned: curJohnGrades[key].Owned, Equipped: curJohnGrades[key].Equipped} });
            }
            localStorage.setItem('JohnGrades', JSON.stringify(newJohnGrades));
        }
        localStorage.setItem('lastOpenedVersion', GAMEINFO.GAMEVERSION);
    }
}

export default FixData;