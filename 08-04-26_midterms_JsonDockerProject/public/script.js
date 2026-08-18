const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const watchlistContainer = document.getElementById("watchlistContainer");
const watchlistCount = document.getElementById("watchlistCount");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let movies = [];
let watchlist = [];


// ============================
// LOAD MOVIES
// ============================

async function loadMovies() {
    try {
        const response = await fetch("/api/movies");

        if (!response.ok) {
            throw new Error("Failed to load movies");
        }

        movies = await response.json();

        displayMovies(movies);

    } catch (error) {
        console.error(error);

        movieContainer.innerHTML = `
            <p>Failed to load movies.</p>
        `;
    }
}


// ============================
// DISPLAY MOVIES
// ============================

function displayMovies(movieList) {

    movieContainer.innerHTML = "";

    if (movieList.length === 0) {
        movieContainer.innerHTML = `
            <p>No movies found.</p>
        `;
        return;
    }

    movieList.forEach(movie => {

        const card = document.createElement("div");

        card.className = "movie-card";

        card.innerHTML = `
            <img
                src="${movie.image}"
                alt="${movie.title}"
                draggable="false"
            >

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>
                    ${movie.genre} • ${movie.year}
                </p>

                <p class="rating">
                    ⭐ ${movie.rating}
                </p>

                <button
                    class="movie-button"
                    data-movie-id="${movie.id}"
                >
                    + Add to Watchlist
                </button>

            </div>
        `;

        movieContainer.appendChild(card);
    });
}


// ============================
// ADD TO WATCHLIST
// ============================

movieContainer.addEventListener("click", (event) => {

    const button =
        event.target.closest(".movie-button");

    if (!button) return;

    const movieId =
        Number(button.dataset.movieId);

    addToWatchlist(movieId);

});


// ============================
// ADD FUNCTION
// ============================

function addToWatchlist(id) {

    const movie =
        movies.find(movie => movie.id === id);

    if (!movie) {
        console.error("Movie not found:", id);
        return;
    }

    const alreadyExists =
        watchlist.some(movie => movie.id === id);

    if (alreadyExists) {

        showMessage(
            `${movie.title} is already in your watchlist.`
        );

        return;
    }

    watchlist.push(movie);

    updateWatchlist();

    showMessage(
        `${movie.title} added to your watchlist!`
    );
}


// ============================
// REMOVE FROM WATCHLIST
// ============================

function removeFromWatchlist(id) {

    watchlist =
        watchlist.filter(movie => movie.id !== id);

    updateWatchlist();
}


// ============================
// UPDATE WATCHLIST
// ============================

function updateWatchlist() {

    watchlistCount.textContent =
        watchlist.length;

    if (watchlist.length === 0) {

        watchlistContainer.innerHTML = `
            <p>Your watchlist is empty.</p>
        `;

        return;
    }

    watchlistContainer.innerHTML = "";

    watchlist.forEach(movie => {

        const item =
            document.createElement("div");

        item.className =
            "watchlist-item";

        item.innerHTML = `
            <img
                src="${movie.image}"
                alt="${movie.title}"
            >

            <div>
                <h3>${movie.title}</h3>

                <p>
                    ${movie.year} • ${movie.genre}
                </p>
            </div>

            <button
                class="remove-button"
                data-remove-id="${movie.id}"
            >
                Remove
            </button>
        `;

        watchlistContainer.appendChild(item);
    });
}


// ============================
// REMOVE BUTTON
// ============================

watchlistContainer.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(".remove-button");

        if (!button) return;

        const movieId =
            Number(button.dataset.removeId);

        removeFromWatchlist(movieId);
    }
);


// ============================
// MESSAGE
// ============================

function showMessage(message) {

    const notification =
        document.createElement("div");

    notification.className =
        "notification";

    notification.textContent =
        message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 2000);
}


// ============================
// SEARCH
// ============================

searchInput.addEventListener(
    "input",
    () => {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();

        const filteredMovies =
            movies.filter(movie => {

                return (
                    movie.title
                        .toLowerCase()
                        .includes(searchTerm)
                    ||
                    movie.genre
                        .toLowerCase()
                        .includes(searchTerm)
                );

            });

        displayMovies(filteredMovies);

        movieContainer.scrollLeft = 0;
    }
);


// ============================
// NEXT
// ============================

nextButton.addEventListener(
    "click",
    () => {

        movieContainer.scrollBy({
            left: 500,
            behavior: "smooth"
        });

    }
);


// ============================
// PREVIOUS
// ============================

prevButton.addEventListener(
    "click",
    () => {

        movieContainer.scrollBy({
            left: -500,
            behavior: "smooth"
        });

    }
);


// ============================
// MOUSE DRAG
// ============================

let isDragging = false;
let startX = 0;
let startScrollLeft = 0;

movieContainer.addEventListener(
    "mousedown",
    (event) => {

        // Don't start drag if clicking on a button
        if (event.target.closest(".movie-button")) {
            return;
        }

        isDragging = true;

        movieContainer.classList.add(
            "dragging"
        );

        startX = event.pageX;

        startScrollLeft =
            movieContainer.scrollLeft;
    }
);

movieContainer.addEventListener(
    "mouseleave",
    () => {

        isDragging = false;

        movieContainer.classList.remove(
            "dragging"
        );
    }
);

movieContainer.addEventListener(
    "mouseup",
    () => {

        isDragging = false;

        movieContainer.classList.remove(
            "dragging"
        );
    }
);

movieContainer.addEventListener(
    "mousemove",
    (event) => {

        if (!isDragging) return;

        event.preventDefault();

        const distance =
            event.pageX - startX;

        movieContainer.scrollLeft =
            startScrollLeft - distance;
    }
);


// ============================
// TOUCH SWIPE
// ============================

let touchStartX = 0;
let touchStartScroll = 0;

movieContainer.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.touches[0].pageX;

        touchStartScroll =
            movieContainer.scrollLeft;
    },
    { passive: true }
);

movieContainer.addEventListener(
    "touchmove",
    (event) => {

        const currentX =
            event.touches[0].pageX;

        const distance =
            currentX - touchStartX;

        movieContainer.scrollLeft =
            touchStartScroll - distance;
    },
    { passive: true }
);


// ============================
// START
// ============================

loadMovies();