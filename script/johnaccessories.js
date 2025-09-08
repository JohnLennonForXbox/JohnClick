export var JohnAccessories = {
    "None": {
        Price: 0,
        Johntiplier: 1,
        Owned: true,
        Equipped: true,
        Image: "./img/accessories/none.png",
        Description: "Just John",
    },
    "Aweseom Sun Lennon": {
        Price: 500,
        Johntiplier: 1.5,
        Owned: false,
        Equipped: false,
        Image: "./img/accessories/awesome glasses.svg",
        Description: "Makes John look cool and gives you 1.5x more Johns per click",
    },
    "Birthday Hat": {
        Price: 1500,
        Johntiplier: 2,
        Owned: false,
        Equipped: false,
        Image: "./img/accessories/birthday lennon.svg",
        Description: "Celebrate John's birhday and get 2x more Johns per click",
    },
    "Sunglasses": {
        Price: 5000,
        Johntiplier: 4,
        Owned: false,
        Equipped: false,
        Image: "./img/accessories/Coolio lennio.svg",
        Description: "Make John look even cooler and get 4x more Johns per click",
    },
    "Johnny's Bowtie": {
        Price: 200000,
        Johntiplier: 6,
        Owned: false,
        Equipped: false,
        Image: "./img/accessories/Johnny Bowtie.svg",
        Description: "Johnny's bowtie from the 1960s, gives you 6x more Johns per click",
    },
    "Ringo's Scarf": {
        Price: 10000000,
        Johntiplier: 8,
        Owned: false,
        Equipped: false,
        Image: "./img/accessories/ringo's scarf.svg",
        Description: "Ringo Starr's scarf, its drum powers gives you 8x more Johns per click",
    },
    "John Hat": {
        Price: 50000000,
        Johntiplier: 10,
        Owned: false,
        Equipped: false,
        Image: "./img/accessories/rockin' John hat.svg",
        Description: "John's iconic hat, gives you 10x more Johns per click",
    },
    "Wizard Hat": {
        Price: 100000000,
        Johntiplier: 20,
        Owned: false,
        Equipped: false,
        Image: "./img/accessories/Wizard Hat.svg",
        Description: "Makes John a master of the dark arts, gives you 20x more Johns per click",
    },
    "misery": {
        Price: 1000000000000,
        Johntiplier: 50,
        Owned: false,
        Equipped: false,
        Image: "./img/accessories/misery.svg",
        Description: "oh the misery everybody wants to be my lennony",
    }
}

var SaveJohnAccessories = JSON.parse(localStorage.getItem("JohnAccessories"));

if (SaveJohnAccessories == null) { // New JohnGrades format, only stores Owned and Equipped
    console.log("writing starter John Accessories");
    SaveJohnAccessories = {};
    for (const name in JohnAccessories) {
        SaveJohnAccessories[name] = {Owned: false, Equipped: false};
    }
    console.log(SaveJohnAccessories);
    SaveJohnAccessories["None"] = {Owned: true, Equipped: true};
} else {
    for (const name in JohnAccessories) { // Reconcile new JohnGrades with old saves
        // Something could go really wrong if SaveFixer doesn't run before this on <v1.5.0 saves
        if (SaveJohnAccessories[name] === undefined) {
            SaveJohnAccessories[name] = {Owned: false, Equipped: false};
        }
    }
}
if (localStorage.getItem("Johntiplier") == null) {
    localStorage.setItem("Johntiplier", "1");
}
localStorage.setItem("JohnAccessories", JSON.stringify(SaveJohnAccessories));