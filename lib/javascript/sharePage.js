
    let shareButton = document.getElementById("share");
    let shareUrl = window.location.href;
    let shareTitle = document.title;

    // Check if Web Share API is supported
    // If not, copy URL to clipboard
    shareButton.addEventListener("click", async () => {
        try {
            await window.navigator.share({ title: shareTitle, url: shareUrl });
        } catch (err) {
            console.error("Share failed:", err.message);
            navigator.clipboard.writeText(shareUrl);
            snackMessage("URL copied to clipboard", 6000);
        }
      });

function snackMessage(msg, duration)
{
    let elem = document.createElement("div");
    elem.classList.add("snack-bar");
    elem.setAttribute("style", "z-index: 2;")
    let elemText = document.createElement("p");
    elemText.innerHTML = msg;
    
    elemDismiss = document.createElement('button');
    elemDismiss.classList.add('icon-button');
    elemDismiss.innerHTML = 'x';
    let dismissTimeout = setTimeout(function(){
        elem.parentNode.removeChild(elem);
    }, duration);
    elemDismiss.addEventListener('click', function(){
        clearTimeout(dismissTimeout);
        elem.parentNode.removeChild(elem);
    });
    
    elem.appendChild(elemText);
    elem.appendChild(elemDismiss);
    document.querySelector(".wrapping-grid").appendChild(elem);
}