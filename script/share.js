const shareButton = document.getElementById("shareButton");
const shareDialogButton = document.getElementById("share-dialog");
const shareClipboardButton = document.getElementById("share-clipboard");
const shareContainer = document.getElementById("shareContainer");

if (!navigator.share) {
    shareDialogButton.style = "display: none"
}

function generateFlex() {
    return `I have ${parseFloat(localStorage.getItem("JohnScore")).toLocaleString()} JohnScore in John Lennon Clicker! Can you beat me?`
}


shareButton.addEventListener("click", async () => {
    if (shareContainer.classList.contains("hide")) {
        shareContainer.classList.remove("hide");
    } else {
        shareContainer.classList.add("hide");
    }
});

shareDialogButton.addEventListener("click", async () => {
     try {
        await navigator.share({
            text: generateFlex(),
            url: window.location.href,
        });
        shareContainer.classList.add("hide");
    } catch (error) {
        console.error('Error sharing content:', error);
        alert("There was an error flexing your JohnScore 💔")
    }
})

shareClipboardButton.addEventListener("click", async () => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(generateFlex() + "\n" + window.location.href)
        alert("Copied!")
        shareContainer.classList.add("hide");
    } else {
        prompt("Copy this to flex your JohnScore cuz we can't access your clipboard:", generateFlex() + "\n" + window.location.href)
        shareContainer.classList.add("hide");
    }
})