document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("watchlist-container");
  container.innerHTML = "";

  const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

  if (watchlist.length === 0) {
    container.innerHTML = "<p>Your watch list is empty.</p>";
    return;
  }

  watchlist.forEach((item, idx) => {
    const detailPage = item.type === "movie" ? "moviedetail.html" : "Tvshowsdetails.html";
    container.innerHTML += `
      <div class="box" data-idx="${idx}">
        <a href="${detailPage}"
          data-title="${item.title}"
          data-year="${item.year}"
          data-genre="${item.genre}"
          data-rating="${item.rating}"
          data-overview="${item.overview}"
          data-poster="${item.poster}"
          data-bg="${item.bg}"
          ${item.type === "tv" ? `data-creator="${item.creator}" data-seasons='${JSON.stringify(item.seasons || [])}'` : ""}
          data-type="${item.type}"
        >
          <div class="box-img">
            <img src="${item.poster}" alt="${item.title}">
          </div>
          <div class="text">
            <h3>${item.title}</h3>
            <p>${item.genre}</p>
            <span><i class='bx bxs-star' style='color:#ddec00'></i>${item.rating}</span>
          </div>
        </a>
      </div>
    `;
  });

  // ✅ Open details from watchlist
  container.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const title = this.dataset.title;
      const year = this.dataset.year;
      const type = this.dataset.type;
      const item = watchlist.find(i => i.title === title && i.year === year);

      if (!item) return;

      // Always set section to "watchlist"
      item.section = "watchlist";

      if (type === "movie") {
  item.section = "watchlist";
  localStorage.setItem("selectedMovie", JSON.stringify(item));
  window.location.href = "moviedetail.html";
} else if (type === "tv") {
  item.section = "watchlist";
  localStorage.setItem("selectedTVShow", JSON.stringify(item));
  window.location.href = "Tvshowsdetails.html";
}
    });
  });

  // Navbar toggle
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

  
});
