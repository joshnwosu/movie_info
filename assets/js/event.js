
// Toggle Navbar

const navbarToggle = document.querySelector('.navbar-toggle');

navbarToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-toggle');
  // getMovies();
  document.body.classList.toggle('body-overflow')
});

// Toggle Navbar with Overlay
const overlayToggle = document.querySelector('.navbar-overlay');

overlayToggle.addEventListener('click', () => {
  document.body.classList.remove('nav-toggle');
  document.body.classList.toggle('body-overflow')
});

// Toggle Movie Current View

const moviesFavToggle = document.querySelector('.movies-fav-toggle');

moviesFavToggle.addEventListener('click', () => {
  document.body.classList.add('movies-view');
  document.body.classList.remove('nav-toggle');
});

const moviesResToggle = document.querySelector('.movies-result-toggle');

moviesResToggle.addEventListener('click', () => {
  document.body.classList.remove('movies-view');
  document.body.classList.remove('nav-toggle');
});

// close movie data overlay

function closeDataOverlay() {
  document.body.classList.add('close-data-overlay');
  movieInfo();
  document.body.style.overflow = 'auto'
}

// Store a copy of the fetch function
var _oldFetch = fetch; 

// Create our new version of the fetch function
window.fetch = function(){

    // Create hooks
    var fetchStart = new Event( 'fetchStart', { 'view': document, 'bubbles': true, 'cancelable': false } );
    var fetchEnd = new Event( 'fetchEnd', { 'view': document, 'bubbles': true, 'cancelable': false } );

    // Pass the supplied arguments to the real fetch function
    var fetchCall = _oldFetch.apply(this, arguments);

    // Trigger the fetchStart event
    document.dispatchEvent(fetchStart);

    fetchCall.then(function(){
        // Trigger the fetchEnd event
        document.dispatchEvent(fetchEnd);
    }).catch(function(){
        // Trigger the fetchEnd event
        document.dispatchEvent(fetchEnd);
    });

    return fetchCall;
};

document.addEventListener('fetchStart', function() {
  document.body.classList.add('show-load')
  console.log('start')
});

document.addEventListener('fetchEnd', function() {
  document.body.classList.remove('show-load')
  console.log('end')
});

// toggle movie info
function movieInfo() {
  document.querySelector('.movie-data-wrap').classList.toggle('movie-data-overlay')
  document.body.style.overflow = 'hidden'
}