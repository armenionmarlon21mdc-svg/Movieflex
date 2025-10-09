// moviedetails.js
document.addEventListener("DOMContentLoaded", () => {
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));

  if (movie) {
  document.getElementById("movie-title").innerHTML = `${movie.title} <span>(${movie.year})</span>`;
  document.getElementById("movie-genre").textContent = movie.genre;
  document.getElementById("movie-score").textContent = movie.rating + "/10";
  document.getElementById("movie-overview").textContent = movie.overview;
  // poster + background
  document.getElementById("movie-poster").src = movie.poster;
  document.getElementById("movie-bg").src = movie.bg;

  // ⭐ Render rating stars dynamically
    const starsContainer = document.getElementById("movie-stars");
    if (starsContainer) {
      starsContainer.innerHTML = "";
      const rating = Math.round(Number(movie.rating)) || 0; // round to nearest int
      for (let i = 0; i < 10; i++) {
        starsContainer.innerHTML += `<i class="bx bxs-star${i < rating ? "" : " inactive"}"></i>`;
      }
    }
    
  // ✅ back button logic for movies and watchlist
const backBtn = document.querySelector(".back-icon");
if (backBtn && movie.section) {
  if (movie.section === "watchlist") {
    backBtn.href = "watchlist.html";
  } else {
    backBtn.href = "MovieSection.html#" + movie.section + "-section";
  }
}
    }

// Add this inside your DOMContentLoaded event

const addToListBtn = document.querySelector('.btn-outline');
    if (addToListBtn) {
        const movie = JSON.parse(localStorage.getItem("selectedMovie"));
        let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
        const inWatchlist = watchlist.some(item => item.title === movie.title && item.type === "movie");

        if (inWatchlist) {
            addToListBtn.innerHTML = `<i class="bx bx-minus"></i> Remove from List`;
            addToListBtn.onclick = function(e) {
                e.preventDefault();
                watchlist = watchlist.filter(item => !(item.title === movie.title && item.type === "movie"));
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
                alert("Removed from Watch List!");
                location.reload();
            };
        } else {
            addToListBtn.parentElement.onclick = function(e) {
                e.preventDefault();
                movie.type = "movie";
                watchlist.push(movie);
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
                alert("Added to Watch List!");
                location.reload();
            };
        }
    }

    // ✅ Navbar highlight fix for MovieDetails.html
// ✅ Navbar highlight fix for MovieDetails
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => link.classList.remove('home-active', 'active'));

// Always highlight Watchlist if opened from there
if (movie.section === "watchlist") {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === 'watchlist.html') {
      link.classList.add('home-active');
    }
  });
}
// Otherwise, highlight Movies section normally
else {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === 'MovieSection.html') {
      link.classList.add('home-active');
    }
  });
}

// ✅ Navbar toggle for mobile
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}



});
