const baseURL = 'https://ghibliapi.herokuapp.com/species';

//GENERAL SETUP

const yesButton = document.getElementById('yesButton');
yesButton.addEventListener('click', fetchCats);

const noButton = document.getElementById('noButton');
noButton.addEventListener('click', tryAgain);

const okButton = document.getElementById('okButton');
okButton.addEventListener('click', fetchCats);
okButton.style.display = 'none';

const topText = document.getElementById('topText');

const catContainer = document.querySelector('.catContainer');

//FETCH SETUP

async function fetchCats() {
    const results = await fetch(baseURL);
    const jsonifiedResults = await results.json();
    displayCats(jsonifiedResults);
}

//DISPLAY SETUP

function tryAgain() {
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
    topText.innerText = 'Maybe you should try again...';
    okButton.style.display = 'block';
}

async function displayCats(json) {
    topText.innerText = 'Here they are!';
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
    okButton.style.display = 'none';

    let cats = json[4].people;
    //console.log(json);
    //console.log(json[4].people);
    console.log(cats);

    for (let i = 0; i < cats.length; i++) {
        //console.log(i);
        let division = document.createElement('div');
        division.className = 'card';
        division.id = 'card' + i;

        let catInfo = await fetch(cats[i]);
        let jsonifiedCatInfo = await catInfo.json();
        let catName = jsonifiedCatInfo.name;

        let name = document.createElement('h2');
        name.innerText = catName;

        let films = jsonifiedCatInfo.films;

        let filmInfo, movieTitle, description;

        division.appendChild(name);

        for (let j = 0; j < films.length; j++) {
            let movieAndRelease = document.createElement('p');
            movieAndRelease.className = 'movieAndRelease';
            movieAndRelease.id = 'movieAndRelease' + j;

            let summary = document.createElement('p');
            //console.log(films);
           
            filmInfo = await fetch(films[j]);
            let jsonifiedFilmInfo = await filmInfo.json();
            console.log(jsonifiedFilmInfo);

            movieTitle = jsonifiedFilmInfo.title;
            releaseDate = jsonifiedFilmInfo.release_date;
            description = jsonifiedFilmInfo.description;

            movieAndRelease.innerHTML = `${movieTitle}, ${releaseDate} `;
            summary.innerHTML = description;

            division.appendChild(movieAndRelease);
            division.appendChild(summary);
        }

        catContainer.appendChild(division);
    }
}