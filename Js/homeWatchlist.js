document.addEventListener("DOMContentLoaded", () => {
  // Select all "Add List" buttons on the home slider
  const addListButtons = document.querySelectorAll(".home .btn");

  addListButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Get movie title and background image
      const slide = btn.closest(".swiper-slide");
      const title = slide.querySelector("h1").textContent.trim();
      const bg = slide.querySelector("img").getAttribute("src");

      // Create movie data structure
      const movieData = {
        title: title,
        year: "2025", // optional placeholder
        genre: "Unknown",
        rating: "N/A",
        overview: "No overview available.",
        poster: bg,
        bg: bg,
        type: "movie",
        section: "watchlist"
      };

      // Load and update watchlist in localStorage
      let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

      const alreadyAdded = watchlist.some(item => item.title === movieData.title);
      if (alreadyAdded) {
        alert(`${movieData.title} is already in your Watchlist!`);
        return;
      }

      watchlist.push(movieData);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));

      alert(`${movieData.title} added to your Watchlist!`);
    });
  });
});
