




// TV Shows filter logic
document.addEventListener("DOMContentLoaded", () => {
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
    
    
    // TV Shows filter
    const tvFilterBtns = document.querySelectorAll('#TvShows .filter-btn');
    const tvSections = document.querySelectorAll('.shows-section');
    const tvTitle = document.querySelector('#TvShows #category-title');

    tvFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tvFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tvSections.forEach(section => section.classList.remove('active'));

            const category = btn.dataset.category;
            const targetSection = document.getElementById(`${category}-shows`);
            if (targetSection) {
                targetSection.classList.add('active');
                tvTitle.textContent = `${btn.textContent} TV Shows`;
            }
        });
    });

    // TV Shows card click logic
    document.querySelectorAll(".shows-container a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const tvShowData = {
                title: this.dataset.title,
                year: this.dataset.year,
                genre: this.dataset.genre,
                rating: this.dataset.rating,
                overview: this.dataset.overview,
                poster: this.dataset.poster,
                bg: this.dataset.bg,
                creator: this.dataset.creator,
                seasons: JSON.parse(this.dataset.seasons || "[]"),
                section: this.dataset.section
            };
            localStorage.setItem("selectedTVShow", JSON.stringify(tvShowData));
            window.location.href = "Tvshowsdetails.html";
        });
    });

    // Auto-open correct TV section when coming back
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.replace("#", "");
        const targetSection = document.getElementById(sectionId);

        if (targetSection) {
            tvSections.forEach(section => section.classList.remove("active"));
            targetSection.classList.add("active");

            tvFilterBtns.forEach(b => b.classList.remove("active"));
            const btn = document.querySelector(`#TvShows .filter-btn[data-category="${sectionId.replace("-shows","")}"]`);
            if (btn) btn.classList.add("active");

            const text = btn ? btn.textContent : "TV Shows";
            tvTitle.textContent = `${text} TV Shows`;
        }
    }
});