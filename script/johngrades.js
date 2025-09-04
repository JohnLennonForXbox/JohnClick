var DefaultJohnGrades = {
    "John Lennon": {
        Price: 0,
        JohnClicks: 1,
        Owned: true,
        Equipped: true,
        Image: "./img/jlennon.png",
        Description: "The original John. Click him to get more Johns!",
    },
    "Stone Lennon": {
        Price: 10,
        JohnClicks: 2,
        Owned: false,
        Equipped: false,
        Image: "./img/stone lennon.png",
        Description: "Stone statue of John Lennon, he breaks apart and gives you 2 Johns per click",
    },
    "Iron Lennon": {
        Price: 100,
        JohnClicks: 5,
        Owned: false,
        Equipped: false,
        Image: "./img/iron lennon.png",
        Description: "Cast iron model of John Lennon, he has a little john encapsulated in his head that gives you 5 Johns per click",
    },
    "Gold Lennon": {
        Price: 1000,
        JohnClicks: 10,
        Owned: false,
        Equipped: false,
        Image: "./img/gold lennon.png",
        Description: "So shiny he blinds you and the game director and he gives you 10 Johns per click by mistake because hes so shiny",
    },
    "Diamond Lennon": {
        Price: 10000,
        JohnClicks: 50,
        Owned: false,
        Equipped: false,
        Image: "./img/diamond lennon.png",
        Description: "A diamond so hard it cuts through your screen and gives you 50 Johns per click",
    },
    "Emerald Lennon": {
        Price: 100000,
        JohnClicks: 100,
        Owned: false,
        Equipped: false,
        Image: "./img/emerald lennon.png",
        Description: "Got it from some guy that looks like squidward, his ear is a crank that dispenses 100 Johns per click",
    },
    "Ruby Lennon": {
        Price: 1000000,
        JohnClicks: 500,
        Owned: false,
        Equipped: false,
        Image: "./img/ruby lennon.png",
        Description: "How many hue shifts can i get away with? This one gives you 500 Johns per click",
    },
    "Amethyst Lennon": {
        Price: 10000000,
        JohnClicks: 1000,
        Owned: false,
        Equipped: false,
        Image: "./img/amethyst lennon.png",
        Description: "I'm running out of things to wrte for these 1000 Johns per click",
    },
    "Invincible Lennon": {
        Price: 100000000,
        JohnClicks: 5000,
        Owned: false,
        Equipped: false,
        Image: "./img/invincible lennon.png",
        Description: "He's in- TITLECARD and gives you 5000 Johns per click",
    },
    "Six Lennon": {
        Price: 416741674167,
        JohnClicks: 41674167,
        Owned: false,
        Equipped: false,
        Image: "./img/Six Lennon.png",
        Description: "SIX SEVEN",
    }
}

var JohnGrades = JSON.parse(localStorage.getItem("JohnGrades"));
JohnGrades = Object.assign({}, DefaultJohnGrades, JohnGrades)
if (JohnGrades == null) {
    JohnGrades = DefaultJohnGrades;
    localStorage.setItem("JohnGrades", JSON.stringify(JohnGrades));
}

export default JohnGrades;