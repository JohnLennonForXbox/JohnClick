// This module constructs the settings menu

var settingsValues = {
    "BEAR5DisableSwitch": false,
    "BEAR5EffectsSwitch": false
}

let savedSettings = JSON.parse(localStorage.getItem("settings"));

if (savedSettings == null) {
    savedSettings = settingsValues;
} else {
    for (const key in settingsValues) {
        if (savedSettings[key] === undefined) {
            savedSettings[key] = settingsValues[key];
        }
    }
    settingsValues = savedSettings
}

localStorage.setItem("settings", JSON.stringify(savedSettings));

const settings = {
    "General": {
        "meta": {
            "default": true
        },
        "items": [
            {
                "type": "switch",
                "label": "Disable BEAR 5",
                "id": "BEAR5DisableSwitch",
                "p": "BEAR 5 randomly appears and blocks your John Clicking. Some players may find this disturbing, so this toggle draws a circle around the John Clicker, because bears cannot cross circles.",
                "onChange": (event) => {
                        const EffectsSwitch = document.getElementById("BEAR5EffectsSwitch");
                        if (event.target.selected) {
                            EffectsSwitch.setAttribute("disabled", "");
                        } else {
                            EffectsSwitch.removeAttribute("disabled");
                        }
                    }
            },
            {
                "type": "switch",
                "label": "Reduce BEAR 5 effects",
                "p": "Some players may like the BEAR 5 mechanic, but BEAR 5's effects may induce epileptic episodes. This option disables majority of motion and flashing in BEAR 5's arrival effects.",
                "id": "BEAR5EffectsSwitch",
                "disabled": settingsValues.BEAR5DisableSwitch
            }
        ]
    },
    "Advanced": {
        "items": [
            {
                "type": "outlined-button",
                "label": "Start debugger",
                "id": "startDebuggerButton",
                "onclick": () => {eruda.init();}
            },
                        {
                "type": "outlined-button",
                "label": "Export data",
                "id": "exportDataButton",
                "onclick": () => {window.ExportData();}
            },
                        {
                "type": "outlined-button",
                "label": "Import data",
                "id": "importDataButton",
                "onclick": () => {window.ImportData();}
            },
                        {
                "type": "outlined-button",
                "label": "Erase data",
                "id": "startDebuggerButton",
                "onclick": () => {window.ResetData();}
            },
        ]
    }
}

const settingsContainer = document.getElementById("settingsContainer");
const settingsForm = document.getElementById("settingsForm");
const categoryContainer = document.getElementById("settingsCategoryContainer");

let saveButton = document.getElementById("settingsSave");
let cancelButton = document.getElementById("settingsCancel");
let closeButton = document.getElementById("settingsClose");

settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.submitter.type);
    if (event.submitter.type === "submit") {
        localStorage.setItem("settings", JSON.stringify(settingsValues));
    }
    document.getElementById("settings").classList.add("hide");
})

function constructSettings(category) {
    console.log(category);
    const blueprints = settings[category];
    let constructionSite = document.createElement("div");
    for (const building in blueprints.items) {
        let element = blueprints.items[building];
        let blank;
        switch (element.type) {
            case "switch":
                blank = document.createElement("md-switch");
                blank.id = element.id;
                blank.title = element.title;
                if (settingsValues[element.id]) {
                    blank.setAttribute("selected", "");
                }
                if (element.disabled) {
                    blank.setAttribute("disabled", "");
                }
                if (element.label) {
                    let label = document.createElement("label");
                    label.innerText = element.label;
                    label.setAttribute("for", element.id);
                    if (element.p) {
                        let p = document.createElement("p");
                        p.innerText = element.p
                        label.appendChild(p);
                    }
                    constructionSite.appendChild(label);
                }
                blank.addEventListener("change", (event) => {
                    settingsValues[element.id] = event.target.selected;
                    if (element.onChange) {
                        element.onChange(event);
                    }
                })
                break;
            case "outlined-button":
                blank = document.createElement("md-outlined-button");
                blank.id = element.id;
                blank.innerText = element.label;
                blank.onclick = element.onclick
                break;
            default:
                console.warn("Unrecognized blueprint element '" + element +"'")
                break;
        }
        if (blank) {
            constructionSite.appendChild(blank);
        }
    }

    return constructionSite;
}

function renderSettings(constructed, overwrite) {
    if (overwrite) {
        settingsContainer.innerHTML = "";
        settingsContainer.appendChild(constructed);
    } else if (!overwrite && settingsContainer.innerHTML === "") {
        settingsContainer.appendChild(constructed);
    } else {
        console.warn("Not overwriting settings container")
    }
}

for (const category in settings) {
    let categoryObject = settings[category];
    let categoryButton = document.createElement("md-primary-tab");
    categoryButton.innerText = category;
    categoryContainer.appendChild(categoryButton);
    if (categoryObject.meta) {
        if (categoryObject.meta.default) {
            categoryButton.setAttribute("active", "");
            renderSettings(constructSettings(category));            
        }
    }
    categoryContainer.addEventListener("change", () => {
        renderSettings(constructSettings(categoryContainer.activeTab.innerText), true);  
    });
}