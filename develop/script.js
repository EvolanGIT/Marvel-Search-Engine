//Users enters a super hero name


// Harcoded to wolverine, but this should be an event listener to whatever the user clicks
let userSuperHero = 'wolverine'


const container = document.querySelector('.containerHero');

//call the marvel characters API
const marvel = {
    render: () => {
        const apiCharactersMarvel = 'https://gateway.marvel.com:443/v1/public/characters?name=' + userSuperHero + '&ts=1&apikey=3042eb057dfaa11c5bd0effe0342eb13&hash=596a816a436a8e747d8ce364b9bcf758'
        console.log(apiCharactersMarvel)
        let contentHTML = ''
        fetch(apiCharactersMarvel)
        .then(res => res.json())
        .then((json) => {
            for (const hero of json.data.results) {
                let urlHero = hero.urls[0].url;
                let heroId = hero.id
                contentHTML += `
                <div class="hero-container">
                    <a href="${urlHero}" target="_blank">
                        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                    </a>
                    <h2 class="Title">${hero.name}</h2>
                    <h3>${heroId}</h3>
                    <p class="description">${hero.description}</p>
                <div>
                `
            }
            container.innerHTML = contentHTML;
        })
    }
};

marvel.render();