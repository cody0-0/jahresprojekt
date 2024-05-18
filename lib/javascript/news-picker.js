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
        const newsParam = urlParams.get("news");
        if (newsParam === null) {
            return news.filter(() => Math.random() > 0.666)
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


