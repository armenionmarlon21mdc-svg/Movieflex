document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("selectedTVShow"));
  if (!data) return;

  document.getElementById("tvshow-bg").src = data.bg || "";
  document.getElementById("tvshow-poster").src = data.poster || "";
  document.getElementById("tvshow-title").textContent = `${data.title} (${data.year})`;
  document.getElementById("tvshow-genre").textContent = data.genre || "";
  document.getElementById("tvshow-score").textContent = `${data.rating}/10`;
  document.getElementById("tvshow-overview").textContent = data.overview || "";
  document.getElementById("tvshow-creator").textContent = data.creator || "";

  // Render stars
  const stars = document.getElementById("tvshow-stars");
  stars.innerHTML = "";
  const rating = Math.round(Number(data.rating));
  for (let i = 0; i < 10; i++) {
    stars.innerHTML += `<i class="bx bxs-star${i < rating ? "" : " inactive"}"></i>`;
  }

  // Season selector logic
  const selectedLabel = document.getElementById('selected-season-label');
  const seasonArrow = document.getElementById('season-arrow');
  const seasonList = document.getElementById('season-list');
  const episodeList = document.getElementById('episode-list');

  let currentSeasonIdx = 0; // default to first season

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
      // FIX: Only update the icon class, not innerHTML
      const icon = seasonArrow.querySelector('i');
      if (icon) {
        icon.className = 'fa-solid fa-chevron-down';
      }
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
    if (icon) {
        icon.className = isOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
    }
    });

  renderSelectedSeason();
  renderSeasonList();
  
  // ✅ back button logic for TV shows and watchlist
const backBtn = document.querySelector(".back-icon");
if (backBtn && data.section) {
  if (data.section === "watchlist") {
    backBtn.href = "watchlist.html";
  } else {
    backBtn.href = "tvshows.html#" + data.section;
  }
}


  // Add this inside your DOMContentLoaded event

const addToListBtn = document.querySelector('.btn-outline');
    if (addToListBtn) {
        let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
        const inWatchlist = watchlist.some(item => item.title === data.title && item.type === "tv");

        if (inWatchlist) {
            addToListBtn.innerHTML = `<i class="bx bx-minus"></i> Remove from List`;
            addToListBtn.onclick = function(e) {
                e.preventDefault();
                watchlist = watchlist.filter(item => !(item.title === data.title && item.type === "tv"));
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
                alert("Removed from Watch List!");
                location.reload();
            };
        } else {
            addToListBtn.parentElement.onclick = function(e) {
                e.preventDefault();
                data.type = "tv";
                watchlist.push(data);
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
                alert("Added to Watch List!");
                location.reload();
            };
        }
    }

    // ✅ Navbar highlight fix for TV Shows Details
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => link.classList.remove('home-active', 'active'));

// Always highlight Watchlist if opened from there
if (data.section === "watchlist") {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === 'watchlist.html') {
      link.classList.add('home-active');
    }
  });
}
// Otherwise, highlight TV SHOWS section normally
else {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === 'tvshows.html') {
      link.classList.add('home-active');
    }
  });
}
// ✅ Navbar toggle (mobile)
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}




});