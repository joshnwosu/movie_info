
let searchForm = document.querySelector('#search-form');
let resMovies = document.querySelector('.movies-res-con');
let favMovies = document.querySelector('.movies-fav-con');
let movieData = document.querySelector('.movie-data-wrap');

searchForm.addEventListener('submit', e => {
  let searchText = document.querySelector('#search-input').value;
  searchMovie(searchText);
  e.preventDefault();
  searchForm.reset();
});

function searchMovie(name="lock") {
  fetch("https://omdbapi.com?s="+name+"&apikey=6ff4b6c0")
  .then(res => res.json())
  .then(data => getMovies(data.Search));
};

function getMovies(data) {
  let output = '';
  data.forEach(el => {
    output += resTemplate(el);
  });
  resMovies.innerHTML = output;
}

// Result template
function resTemplate(el) {
  return `
  <a class="movie" title="${el.Title}" onclick="getCurrentMovie('${el.imdbID}')">
  <div class="movie-poster">
  <img src="${el.Poster}" alt="${el.Poster}">
  </div>
  <div class="movie-info">
  <h3 class="movie-title">${el.Title}</h3>
  <div class="movie-details">
  <span class="movie-year">${el.Year}</span>
  <span onclick="saveFavMovie('${el.imdbID}')" class="ion-ios-star icon-star movie-star"></span>
  </div>
  </div>
  </a>
  `;
}

// Favourite template
function favTemplate(el) {
  return `
  <a class="movie" title="${el.Title}">
  <div class="movie-poster">
  <img src="${el.Poster}" alt="${el.Poster}">
  </div>
  <div class="movie-info">
  <h3 class="movie-title">${el.Title}</h3>
  <div class="movie-details">
  <span class="movie-year">${el.Year}</span>
  <span onclick="removeFavMovie('${el.Id}')" class="ion-ios-star star-color icon-star movie-star"></span>
  </div>
  </div>
  </a>
  `;
}

function movieInfosTemplate(data) {
  console.log(data);
  return `
  <div class="movie-data-overlay" onclick="closeDataOverlay()"></div>
  <div class="movie-data">
  <div class="data-close" onclick="closeDataOverlay()">&times;</div>
  <div class="data-wrap">
  <div class="data-title">
  <h3>${data.Title}</h3>
  </div>
  <div class="data-content">
  <div class="data-poster">
  <img src="${data.Poster}" alt="${data.Poster}">
  </div>
  <div class="data-info">
  <ul>
  <li><strong>Director: </strong><span>${data.Director}</span></li>
  <li><strong>Actor: </strong><span>${data.Actors}</span></li>
  <li><strong>Genre: </strong><span>${data.Genre}</span></li>
  <li><strong>Writer: </strong><span>${data.Writer}</span></li>
  <li><strong>Production: </strong><span>${data.Production}</span></li>
  <li><strong>Language: </strong><span>${data.Language}</span></li>
  <li><strong>Rated: </strong><span>${data.Rated}</span></li>
  <li><strong>IMDB Rating: </strong><span>${data.imdbRating}</span></li>
  <li><strong>Type: </strong><span>${data.Type}</span></li>
  <li><strong>Released: </strong><span>${data.Released}</span></li>
  </ul>
  <a href="http://imdb.com/title/${data.imdbID}" class="data-ext" target="_blank">Visit IMDB</a>
  </div>
  </div>
  <div class="divider"></div>
  <div class="data-plot">
  <h3>Plot</h3>
  <p>${data.Plot}</p>
  </div>
  </div>
  </div>
  `
}

function saveFavMovie(id) {
  fetch("https://www.omdbapi.com?i="+id+"&apikey=6ff4b6c0")
  .then(res => res.json())
  .then(data => {
    let title = data.Title;
    let year = data.Year;
    let poster = data.Poster;
    let id = data.imdbID;
    storeMovie(poster, title, year, id);
  });
  event.stopPropagation();
}

function storeMovie(poster, title, year, id) {
  let movieData = {
    Title: title,
    Poster: poster,
    Year: year,
    Id: id
  }
  if(localStorage.getItem("movies") === null) {
    let movies = [];
    movies.push(movieData);
    localStorage.setItem("movies", JSON.stringify(movies));
  } else {
    let movies = JSON.parse(localStorage.getItem("movies"));
    movies.push(movieData);
    localStorage.setItem("movies", JSON.stringify(movies));
  }
  getFavMovies();
}

function getFavMovies() {
  if(localStorage.getItem("movies") != null) {
    let movies = JSON.parse(localStorage.getItem('movies'));
    let output = '';
    movies.forEach(el => {
      output += favTemplate(el);
    })
    favMovies.innerHTML = output;
  } else {
    
  }
}

getFavMovies();

function getCurrentMovie(id) {
  event.preventDefault();
  event.stopPropagation();
  fetch("https://www.omdbapi.com?i="+id+"&apikey=6ff4b6c0")
  .then(res => res.json())
  .then(data => {
    movieData.innerHTML = movieInfosTemplate(data);
    console.log(data);
  });
  document.body.classList.add('overlay-mov');
  document.body.classList.remove('close-data-overlay');
  movieInfo();
}

function removeFavMovie(id) {
  let movies = JSON.parse(localStorage.getItem("movies"));
  for(i=0; i<movies.length; i++) {
    if(movies[i].Id == id) {
      movies.splice(i, 1);
    }
  }
  localStorage.setItem("movies", JSON.stringify(movies))
  getFavMovies();
}

document.querySelector('.trash-icon').addEventListener('click', removeFavMovies);
function removeFavMovies() {
  localStorage.removeItem("movies");
  getFavMovies();
  favMovies.innerHTML = '';
}