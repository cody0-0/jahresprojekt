function createNewsElement(news) {
    const newsElement = document.createElement("a");
    newsElement.classList.add("news-item");
    newsElement.href = news.href;
    const newsHeadline = document.createElement("h3");
    newsHeadline.classList.add("news-headline");
    newsHeadline.innerText = news.headline;
    const newsText = document.createElement("p");
    newsText.classList.add("news-text");
    newsText.innerText = news.text;
    newsElement.appendChild(newsHeadline);
    newsElement.appendChild(newsText);
    return newsElement;
}

fetch("../../resources/news.json")
    .then(json => json.json())
    .then(news => {
        const urlParams = new URLSearchParams(window.location.search);
        const newsParam = urlParams.get("news");
        console.log(newsParam);
        if (newsParam === null) {
            return news.filter(() => Math.random() > 0.666)
        }
        return news.slice(0, newsParam);
    })
    .then(news => {
        const newsBlock = document.getElementById("news-block");
        if (news.length !== 0) {
            newsBlock.style.display = "grid";
            news.forEach(news => {
                newsBlock.appendChild(createNewsElement(news));
            });
        }
    })
    .catch(console.error)

