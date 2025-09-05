if (navigator.share) {
    document.getElementById("shareButton").style.display = "inline-block";
    document.getElementById("shareButton").addEventListener("click", async () => {
        try {
            await navigator.share({
                text: `I have ${localStorage.getItem("JohnScore")} JohnScore in John Lennon Clicker! Can you beat me?`,
                url: window.location.href,
            });
        } catch (error) {
            console.error('Error sharing content:', error);
        }
    });
}