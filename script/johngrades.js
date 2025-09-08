export var JohnGrades = {
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
        JohnClicks: 20,
        Owned: false,
        Equipped: false,
        Image: "./img/gold lennon.png",
        Description: "So shiny he blinds you and the game director and he gives you 20 Johns per click by mistake because hes so shiny",
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
        Price: 50000,
        JohnClicks: 100,
        Owned: false,
        Equipped: false,
        Image: "./img/emerald lennon.png",
        Description: "Got it from some guy that looks like squidward, his ear is a crank that dispenses 100 Johns per click",
    },
    "Ruby Lennon": {
        Price: 500000,
        JohnClicks: 1000,
        Owned: false,
        Equipped: false,
        Image: "./img/ruby lennon.png",
        Description: "How many hue shifts can i get away with? This one gives you 1,000 Johns per click",
    },
    "Amethyst Lennon": {
        Price: 10000000,
        JohnClicks: 5000,
        Owned: false,
        Equipped: false,
        Image: "./img/amethyst lennon.png",
        Description: "I'm running out of things to wrte for these 5,000 Johns per click",
    },
    "Invincible Lennon": {
        Price: 100000000,
        JohnClicks: 500000,
        Owned: false,
        Equipped: false,
        Image: "./img/invincible lennon.png",
        Description: "He's in- TITLECARD and gives you 150,000 Johns per click",
    },
    "Six Lennon": {
        Price: 6741674167,
        JohnClicks: 41674167,
        Owned: false,
        Equipped: false,
        Image: "./img/Six Lennon.png",
        Description: "SIX SEVEN",
    },
    "Chimera Lennon": {
        Price: 0,
        JohnClicks: 0,
        Owned: false,
        Equipped: false,
        Image: "./img/Chimera Lennon.png",
        Description: "NOOO YOU'RE SUPPOSED TO OBEY ME The Seven LEnnon SouLS: ",
    },
}

if (JohnGrades["Chimera Lennon"].JohnClicks == 0) { // Chimera Lennon is a combination of all other JohnGrades
    for (const name in JohnGrades) {
        if (name == "Chimera Lennon") {
            continue;
        }
        JohnGrades["Chimera Lennon"].JohnClicks += JohnGrades[name].JohnClicks
        JohnGrades["Chimera Lennon"].Price += JohnGrades[name].Price
        // As such it is as expensive as all other JohnGrades combined
        // and gives as many Johns per click as all other JohnGrades combined
        // I should probably multiply this by like 200 or something because when
        // you get the highest Johngrade you need to click like twice to get all the
        // JohnScore required for chimera lennon
    }
}

var SavedJohnGrades = JSON.parse(localStorage.getItem("JohnGrades"));

if (SavedJohnGrades == null) { // New JohnGrades format, only stores Owned and Equipped
    console.log("writing starter Johngrades");
    SavedJohnGrades = {};
    for (const name in JohnGrades) {
        SavedJohnGrades[name] = {Owned: false, Equipped: false};
    }
    console.log(SavedJohnGrades);
    SavedJohnGrades["John Lennon"] = {Owned: true, Equipped: true};
} else {
    for (const name in JohnGrades) { // Reconcile new JohnGrades with old saves
        // Something could go really wrong if SaveFixer doesn't run before this on <v1.5.0 saves
        if (SavedJohnGrades[name] === undefined) {
            SavedJohnGrades[name] = {Owned: false, Equipped: false};
        }
    }
}
localStorage.setItem("JohnGrades", JSON.stringify(SavedJohnGrades));

// localStorage.setItem("JohnGrades", JSON.stringify(JohnGrades));
