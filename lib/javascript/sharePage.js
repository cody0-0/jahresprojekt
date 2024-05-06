
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
            snackBar("URL copied to clipboard", 6000);
        }
      });

function snackBar(msg, duration)
{
    let elem = document.createElement("div");
    elem.classList.add("snack-bar");
    elem.setAttribute("style", "z-index: 2;")
    let elemText = document.createElement("p");
    elemText.innerHTML = msg;
    
    elemDismiss = document.createElement('button');
    elemDismiss.classList.add('icon-button');
    elemDismiss.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>';
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