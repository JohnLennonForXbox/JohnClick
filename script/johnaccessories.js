var DefaultJohnAccessories = {
    "None": {
        Price: 0,
        Johntiplier: 1,
        Owned: true,
        Equipped: true,
        Image: undefined,
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
}

var JohnAccessories = JSON.parse(localStorage.getItem("JohnAccessories"));
JohnAccessories = Object.assign({}, DefaultJohnAccessories, JohnAccessories)
if (JohnAccessories == null) {
    JohnAccessories = DefaultJohnAccessories;
}

localStorage.setItem("JohnAccessories", JSON.stringify(JohnAccessories));

export default JohnAccessories;