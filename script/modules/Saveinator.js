// Perry the platypus you're just in time for my john lennon clicker
// Saveintor

export function ResetData() {
    if (confirm("Are you sure you want to reset all your data? This action cannot be undone.")) {
        if (confirm("Are you REALLY sure you want to reset all your data? This action cannot be undone and your johns will be ground up into a fine paste.")) {
            localStorage.clear();
            location.reload();
        }
    }
}

export function ExportData() {
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

export function ImportData() {
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
window.ResetData = ResetData;