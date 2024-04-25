fetch("../../resources/content.json")
    .then(json => json.json())
    .then(console.log)
    .catch(console.error)