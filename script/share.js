const shareButton = document.getElementById("shareButton");
const shareDialogButton = document.getElementById("navShare");
const shareDialog = document.getElementById("shareDialog");

if (!navigator.share) {
    shareDialogButton.style = "display: none"
}

function generateFlex() {
    return `I have ${parseFloat(localStorage.getItem("JohnScore")).toLocaleString()} JohnScore in John Lennon Clicker! Can you beat me?`
}


shareButton.addEventListener("click", async () => {
    shareDialog.show();
});

shareDialog.addEventListener("close", async () => {
    if (shareDialog.returnValue === "copy") {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(generateFlex() + "\n" + window.location.href)
            alert("Copied!")
        } else {
            prompt("Copy this to flex your JohnScore cuz we can't access your clipboard:", generateFlex() + "\n" + window.location.href)
        }
    } else if (shareDialog.returnValue === "share") {
        try {
            await navigator.share({
                text: generateFlex(),
                url: window.location.href,
            });
        } catch (error) {
            console.error('Error sharing content:', error);
            alert("There was an error flexing your JohnScore 💔")
        }
    } else {
        console.error("HOW");
    }
})