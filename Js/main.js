var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ✅ Movie List Slider (Arrows + Swipe + Responsive)
// ✅ Movie List Slider (Arrows + Swipe + Responsive)
document.querySelectorAll(".movie-list-wrapper").forEach(wrapper => {
  const list = wrapper.querySelector(".movie-list");
  const left = wrapper.querySelector(".arrow.left");
  const right = wrapper.querySelector(".arrow.right");

  const itemNumber = list.querySelectorAll(".movie-list-item").length;
  const itemWidth = 180 + 30; // width + margin
  let clickCounter = 0;

  // Helper: get current X translation
  function getTranslateX(element) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m41;
  }

  // ✅ Responsive visible item count
  function getVisibleItems() {
    if (window.matchMedia("(max-width: 390px)").matches) return 2;
    if (window.matchMedia("(max-width: 480px)").matches) return 3;
    if (window.matchMedia("(max-width: 768px)").matches) return 3; // mobile
    if (window.matchMedia("(max-width: 1680px)").matches) return 3; // tablet
    return 5; // desktop
  }

  // ➡️ Move Right
  if (right) {
  right.addEventListener("click", () => {
    const visibleItems = window.innerWidth <= 768 ? 3 : 6;
    const maxTranslate = (itemNumber - visibleItems) * itemWidth;
    const currentX = Math.abs(getTranslateX(list));

    // Move to the next slide
    if (currentX < maxTranslate) {
      list.style.transform = `translateX(-${currentX + itemWidth}px)`;
      clickCounter++;
    } 
    // ✅ When it reaches the end, return to the first poster
    else {
      list.style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
}

if (left) {
  left.addEventListener("click", () => {
    const currentX = Math.abs(getTranslateX(list));
    const visibleItems = window.innerWidth <= 768 ? 3 : 6;
    const maxTranslate = (itemNumber - visibleItems) * itemWidth;

    // Move left
    if (currentX > 0) {
      list.style.transform = `translateX(-${currentX - itemWidth}px)`;
      clickCounter--;
    } 
    // ✅ Optional: If at start and click left → go to end (for a smooth loop)
    else {
      list.style.transform = `translateX(-${maxTranslate}px)`;
      clickCounter = itemNumber - visibleItems;
    }
  });
}

  // ✅ Touch Swipe Support
  let startX = 0;
  let isSwiping = false;

  list.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  list.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const moveX = e.touches[0].clientX;
    const diff = startX - moveX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && right) right.click(); // swipe left
      else if (diff < 0 && left) left.click(); // swipe right
      isSwiping = false;
    }
  });

  list.addEventListener("touchend", () => {
    isSwiping = false;
  });
});

// ✅ Reset slider position when resizing
window.addEventListener("resize", () => {
  document.querySelectorAll(".movie-list").forEach(list => {
    list.style.transform = "translateX(0)";
  });
});


// ✅ Reset slider when resizing screen
window.addEventListener("resize", () => {
  document.querySelectorAll(".movie-list").forEach(list => {
    list.style.transform = "translateX(0)";
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

// Highlight active navbar item
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll(".navbar a");
  const currentPage = window.location.pathname.split('/').pop() || 'Movies.html';

  navLinks.forEach(link => link.classList.remove("active"));
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      navLinks.forEach(item => item.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // ✅ Add Watchlist and Details logic for Swiper slides
  document.querySelectorAll(".home .swiper-slide").forEach(slide => {
    const title = slide.querySelector("h1").innerText.trim();
    const img = slide.querySelector("img").getAttribute("src");
    const addBtn = slide.querySelector(".btn");
    const playBtn = slide.querySelector(".play");

    const movieData = {
      title: title,
      year: "2025",
      genre: "Unknown",
      rating: "N/A",
      overview: "No overview available yet.",
      creator: "Unknown",
      poster: img,
      bg: img,
      type: "movie",
      section: "home"
    };

    // ▶️ Clicking Play → open details
    playBtn.addEventListener("click", e => {
      e.preventDefault();
      localStorage.setItem("selectedHomeMovie", JSON.stringify(movieData));
      window.location.href = "Homedetails.html";
    });

    // ➕ Add List button → save to watchlist
    addBtn.addEventListener("click", e => {
      e.preventDefault();
      let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      if (watchlist.some(m => m.title === movieData.title)) {
        alert(`${movieData.title} is already in your Watchlist!`);
        return;
      }
      watchlist.push(movieData);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert(`${movieData.title} added to your Watchlist!`);
    });
  });

  // ✅ For all other movie posters (trending, latest, etc.)
  const homeMovieLinks = document.querySelectorAll(".movie-link");
  homeMovieLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const movie = {
        title: link.dataset.title,
        year: link.dataset.year,
        genre: link.dataset.genre,
        rating: link.dataset.rating,
        overview: link.dataset.overview,
        creator: link.dataset.creator,
        poster: link.dataset.poster,
        bg: link.dataset.bg,
        type: link.dataset.type,
        section: "home"
      };
      if (movie.type === "tv") {
        const seasonsRaw = link.dataset.seasons;
        try {
          movie.seasons = seasonsRaw ? JSON.parse(seasonsRaw.replace(/\s+/g, ' ')) : [];
        } catch {
          movie.seasons = [];
        }
      }
      localStorage.setItem("selectedHomeMovie", JSON.stringify(movie));
      window.location.href = "Homedetails.html";
    });
  });
});
