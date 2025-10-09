document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("selectedHomeMovie"));
  if (!data) return;

  // Show/hide TV seasons block based on type
  const tvSeasonsBlock = document.getElementById("tv-seasons-block");
  if (tvSeasonsBlock) {
    if (data.type === "tv" && data.seasons && data.seasons.length > 0) {
      tvSeasonsBlock.style.display = "block";
    } else {
      tvSeasonsBlock.style.display = "none";
    }
  }

  // Common info
  document.getElementById("home-title").innerHTML = `${data.title} <span>(${data.year})</span>`;
  document.getElementById("home-genre").textContent = data.genre;
  document.getElementById("home-score").textContent = data.rating + "/10";
  document.getElementById("home-overview").textContent = data.overview;
  document.getElementById("home-creator").textContent = data.creator;
  document.getElementById("home-poster").src = data.poster;
  document.getElementById("home-bg").src = data.bg;

  // ⭐ Render rating stars
  const starsContainer = document.getElementById("home-stars");
  starsContainer.innerHTML = "";
  const rating = Math.round(Number(data.rating));
  for (let i = 0; i < 10; i++) {
    starsContainer.innerHTML += `<i class="bx bxs-star${i < rating ? "" : " inactive"}"></i>`;
  }

  // 🎬 TV show seasons logic
  if (data.type === "tv" && data.seasons && data.seasons.length > 0) {
    const selectedLabel = document.getElementById('selected-season-label');
    const seasonArrow = document.getElementById('season-arrow');
    const seasonList = document.getElementById('season-list');
    const episodeList = document.getElementById('episode-list');
    let currentSeasonIdx = 0;

    function renderSeasonList() {
      seasonList.innerHTML = '';
      data.seasons.forEach((season, idx) => {
        const li = document.createElement('li');
        li.textContent = `Season ${season.season} (${season.episodes.length} Episodes)`;
        li.style.cursor = 'pointer';
        li.style.padding = '8px 16px';
        li.style.background = idx === currentSeasonIdx ? '#e01f13' : '#222';
        li.style.color = '#fff';
        li.style.borderRadius = '4px';
        li.addEventListener('click', () => {
          currentSeasonIdx = idx;
          seasonList.style.display = 'none';
          const icon = seasonArrow.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-chevron-down';
          renderSelectedSeason();
          renderSeasonList();
        });
        seasonList.appendChild(li);
      });
    }

    function renderSelectedSeason() {
      const season = data.seasons[currentSeasonIdx];
      selectedLabel.textContent = `Season ${season.season} (${season.episodes.length} Episodes)`;
      episodeList.innerHTML = '';
      season.episodes.forEach(ep => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${ep.title}</strong> - ${ep.description}`;
        episodeList.appendChild(li);
      });
    }

    seasonArrow.addEventListener('click', () => {
      const isOpen = seasonList.style.display === 'block';
      seasonList.style.display = isOpen ? 'none' : 'block';
      const icon = seasonArrow.querySelector('i');
      if (icon) icon.className = isOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
    });

    renderSelectedSeason();
    renderSeasonList();
  }

  // ✅ Back button — always return to Home
  const backBtn = document.querySelector(".back-icon");
  if (backBtn) {
    backBtn.href = "Movies.html"; // Always go back to Home
  }

  //  Watchlist logic
  const addToListBtn = document.querySelector(".btn-outline");
  if (addToListBtn) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const inWatchlist = watchlist.some(item => item.title === data.title && item.year === data.year);

    function updateButton() {
      if (inWatchlist) {
        addToListBtn.innerHTML = `<i class="bx bx-minus"></i> Remove from List`;
        addToListBtn.onclick = e => {
          e.preventDefault();
          watchlist = watchlist.filter(item => !(item.title === data.title && item.year === data.year));
          localStorage.setItem("watchlist", JSON.stringify(watchlist));
          alert("Removed from Watch List!");
          location.reload();
        };
      } else {
        addToListBtn.innerHTML = `<i class="bx bx-plus"></i> Add to List`;
        addToListBtn.onclick = e => {
          e.preventDefault();
          const itemToSave = { ...data };
          if (itemToSave.type !== "tv") delete itemToSave.seasons;
          watchlist.push(itemToSave);
          localStorage.setItem("watchlist", JSON.stringify(watchlist));
          alert("Added to Watch List!");
          location.reload();
        };
      }
    }
    updateButton();
  }

  // ✅ Navbar highlight — always highlight HOME
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => link.classList.remove('home-active', 'active'));
  navLinks.forEach(link => {
    if (link.getAttribute('href') === 'Movies.html') {
      link.classList.add('home-active');
    }
  });

  const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

  // Optional hover effect fix
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => link.classList.add('hovering'));
    link.addEventListener('mouseleave', () => link.classList.remove('hovering'));
  });
});
