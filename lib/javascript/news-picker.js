function createNewsElement(news) {
    const newsElement = document.createElement("a");
    newsElement.classList.add("news-item");
    newsElement.href = news.href;
    newsElement.tabIndex = 1;
    const newsHeadline = document.createElement("p");
    newsHeadline.classList.add("anchor-arrow");
    newsHeadline.innerText = news.headline;
    const newsText = document.createElement("p");
    newsText.classList.add("caption");
    newsText.innerText = news.text;
    newsElement.appendChild(newsHeadline);
    newsElement.appendChild(newsText);
    return newsElement;
}

fetch(new URL("../../resources/news.json", document.currentScript.src).href)
    .then(json => json.json())
    .then(news => {
        const urlParams = new URLSearchParams(window.location.search);
        let newsParam = urlParams.get("news");
        if (newsParam === null) {
            // randomly get news items: 1=60%, 2=30%, 3=10%
            const random = Math.random();
            if (random < 0.5) newsParam = 1;
            else if (random < 0.8) newsParam = 2;
            else newsParam = 3;
        }
        return news.slice(0, newsParam);
    })
    .then(news => {
        const newsItems = document.getElementById("news-items");
        if (news.length !== 0) {
            news.forEach(news => {
                newsItems.appendChild(createNewsElement(news));
            });
        }
    })
    .catch(console.error)


