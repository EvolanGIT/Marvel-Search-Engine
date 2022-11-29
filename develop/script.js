//Users enters a super hero name
var searchBarEl = document.querySelector("#searchBar");
var searchBtnEl = document.querySelector("#searchBtn");
var header = $('#header')
var prevBtnEl = ("prevBtn")
var heroListEl = $("#created-btn")
// Harcoded to wolverine, but this should be an event listener to whatever the user clicks
let userSuperHero = 'wolverine'


const container = document.querySelector('.containerHero');
const containerHeroInfo = document.querySelector('.containerHeroInfo');

//call the marvel characters API
const marvel = {
    render: () => {
        const apiCharactersMarvel = 'https://gateway.marvel.com:443/v1/public/characters?name=' + userSuperHero + '&ts=1&apikey=3042eb057dfaa11c5bd0effe0342eb13&hash=596a816a436a8e747d8ce364b9bcf758'
        console.log(apiCharactersMarvel)
        let contentHTML = ''
        fetch(apiCharactersMarvel)
            .then(res => res.json())
            .then((json) => {
                console.log(json)
                for (const hero of json.data.results) {
                    let urlHero = hero.urls[0].url;
                    let heroId = hero.id
                    contentHTML += `
                <figure class="media-left ">
                <div class="image is-128x128">
                    <a href="${urlHero}" target="_blank">
                    <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                    </a>
                </div>
                </figure>
                <div class="media-content">
                <div class="content has-text-black">
                    <h1 class="content has-text-white is-underlined is-bolder">${hero.name}</h1>
                    <h4>Id no.${heroId}</h4>
                    <p class="content has-text-white has-text-weight-semibold is-italic">${hero.description}</p>
                </div>
                </div>
                `
                }
                container.innerHTML = contentHTML;
            })
    }
};

marvel.render();

const rawg = {
    render: () => {
        const apiRawg = 'https://api.rawg.io/api/games?key=d5bbf27705f64c2bbfd9e4ce1a23cc6d&page_size=5&search_precise=true&search=' + userSuperHero
        let contentHTML = ''
        console.log(apiRawg)
        fetch(apiRawg)
            .then(res => res.json())
            .then((json) => {
                console.log(json)
                for (const game of json.results) {
                    let nameGame = game.name;
                    let platformGame = game.platforms[0].platform.name
                    let releaseGame = game.released
                    let urlGame = game.background_image
                    let scoreGame = game.score
                    contentHTML += `
                    <article class="column containerCards notification is-black m-3">
                        <div class="content">
                        <figure class="image is-3by2">
                        <img src="${urlGame}" alt="${nameGame}">
                        </figure>
                        </div>         
                        <div class="content">
                        <p class="content is-size-4 mb-6">${nameGame}</p>
                        <p class="content is-size-6">Platform: ${platformGame} <br> Release Date: ${releaseGame}</p>
                        Overall Score = ${scoreGame}
                        </div>
                    </article>
                `
                }
                containerHeroInfo.innerHTML = contentHTML
            })
    }
}
rawg.render();

//Function for Hero Search
function handleSearch(storedBtnValue) {
    console.log("handleSearch");
    var userSearch = searchBarEl.value;
    var storedHeroes = JSON.parse(localStorage.getItem('storedHeroes')) || []
    console.log(userSearch);
    userSuperHero = userSearch || storedBtnValue;
    marvel.render();
    rawg.render();
    heroListEl.empty();
    storedHeroes.push(userSearch)
    localStorage.setItem('storedHeroes', JSON.stringify(storedHeroes))
    renderButtons()
}
searchBtnEl.addEventListener("click", handleSearch);

function handleSearch2(storedBtnValue) {
    console.log("handleSearch");
    var userSearch = searchBarEl.value;
    var storedHeroes = JSON.parse(localStorage.getItem('storedHeroes')) || []
    console.log(userSearch);
    userSuperHero = userSearch || storedBtnValue;
    marvel.render();
    rawg.render();
    localStorage.setItem('storedHeroes', JSON.stringify(storedHeroes))
    renderButtons()
}


header.on('click', function (event) {
    if (!event.target.matches('.recentSearch')) return
    let storedBtnValue = event.target.innerHTML
    handleSearch2(storedBtnValue)
})
// let storedHeroes = JSON.parse(localStorage.getItem("storedHeroes")) || []

function renderButtons() {
    let storedHeroes = JSON.parse(localStorage.getItem('storedHeroes')) || []
    if (storedHeroes.length === 0) return
    heroListEl.empty()
    for (var i = 0; i < storedHeroes.length; i++) {
        let buttonHistory = $('<button>').html(storedHeroes[i]).attr('id', storedHeroes[i]).addClass('recentSearch')
        heroListEl.append(buttonHistory)
    }
}

function goBack() {
    let storedHeroes = localStorage.getItem('storedHeroes')
    let goBack = history.go(-1)
}
renderButtons()

// function recentSearch (event) {
//     if (!event.target.matches('.recentSearch')) return
//     let storedBtnValue = event.target.innerHTML
//     handleSearch(storedBtnValue)
// } 
