import GAMEINFO from './common.js';

// This script fixes old save data to be compatible with the current version of the game
// For now this exists to fix the JohnGrades object to only store Owned and Equipped properties,
// patching a potential XSS vulnerability and reducing save size
// Also adds a lastOpenedVersion key to localStorage for more save patches later

function FixData() {
    console.log("Running save fixer");
    if (localStorage.getItem('lastOpenedVersion') === null && localStorage.getItem('JohnGrades') !== null) {
        console.log("Fixing JohnGrades save data");
        if (localStorage.getItem('JohnGrades') !== null) { 
            // v1.5.0 and onwards will only store Owned and Equipped properties for each JohnGrade
            let newJohnGrades = {};
            let curJohnGrades = JSON.parse(localStorage.getItem('JohnGrades'))
            for (const key in curJohnGrades) { 
                console.log(curJohnGrades[key]);
                Object.assign(newJohnGrades, { [key]: {Owned: curJohnGrades[key].Owned, Equipped: curJohnGrades[key].Equipped} });
            }
            console.log("Writing fixed JohnGrades to localStorage");
            localStorage.setItem('JohnGrades', JSON.stringify(newJohnGrades));
        }
    }
    localStorage.setItem('lastOpenedVersion', GAMEINFO.GAMEVERSION);
    console.log("Save fixer done");
}

export default FixData;