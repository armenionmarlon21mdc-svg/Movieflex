document.addEventListener("DOMContentLoaded", () => {
    // Menu toggle
    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle("active");
        });
    }

    // Highlight Movies nav if inside movie section
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPage = window.location.pathname.split('/').pop() || 'Movies.html';
    const moviesPages = ["MovieSection.html", "Trending.html", "Popular.html"];

    navLinks.forEach(link => link.classList.remove("active", "home-active"));
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (moviesPages.includes(currentPage) && href === "MovieSection.html") {
            link.classList.add("home-active");
        } else if (href === currentPage) {
            link.classList.add("home-active");
        }
    });

    // ✅ Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const moviesSections = document.querySelectorAll('.movies-section');
    const categoryTitle = document.getElementById('category-title');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Hide all sections
            moviesSections.forEach(section => section.classList.remove('active'));

            // Show clicked section
            const category = btn.dataset.category;
            const targetSection = document.getElementById(`${category}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
                categoryTitle.textContent = `${btn.textContent} Movies`; // change title
            }
        });
    });

// main1.js (or a new script file)
document.querySelectorAll(".movies-container a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // collect data attributes
    const movieData = {
      title: this.dataset.title,
      year: this.dataset.year,
      genre: this.dataset.genre,
      rating: this.dataset.rating,
      overview: this.dataset.overview,
      poster: this.dataset.poster,
      bg: this.dataset.bg,
      section: this.dataset.section   // ✅ save section
    };

    // save to localStorage
    localStorage.setItem("selectedMovie", JSON.stringify(movieData));

    // go to detail page
    window.location.href = "moviedetail.html";
  });
});

//  Auto-open correct section when coming back
const hash = window.location.hash;
if (hash) {
  const sectionId = hash.replace("#", "");
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    // Hide others
    moviesSections.forEach(section => section.classList.remove("active"));
    // Show target
    targetSection.classList.add("active");

    // Update filter button UI
    filterBtns.forEach(b => b.classList.remove("active"));
    const btn = document.querySelector(`.filter-btn[data-category="${sectionId.replace("-section","")}"]`);
    if (btn) btn.classList.add("active");

    // Update title
    const text = btn ? btn.textContent : "Movies";
    categoryTitle.textContent = `${text} Movies`;
  }
}
});
