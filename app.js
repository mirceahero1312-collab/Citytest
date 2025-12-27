// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Reviews system
document.querySelectorAll(".product-card").forEach(card => {
    const productId = card.dataset.product;
    const toggleBtn = card.querySelector(".review-toggle");
    const reviewsBox = card.querySelector(".reviews");
    const reviewList = card.querySelector(".review-list");
    const form = card.querySelector(".review-form");

    toggleBtn.addEventListener("click", () => {
        reviewsBox.classList.toggle("hidden");
        loadReviews();
    });

    function loadReviews() {
        reviewList.innerHTML = "";
        const reviews = JSON.parse(localStorage.getItem(productId)) || [];
        reviews.forEach(r => {
            const div = document.createElement("div");
            div.className = "review";
            div.innerHTML = `<strong>${r.name}</strong> (${r.rating}⭐)<br>${r.text}`;
            reviewList.appendChild(div);
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = form.querySelector("input").value;
        const rating = form.querySelector("select").value;
        const text = form.querySelector("textarea").value;

        const reviews = JSON.parse(localStorage.getItem(productId)) || [];
        reviews.push({ name, rating, text });
        localStorage.setItem(productId, JSON.stringify(reviews));

        form.reset();
        loadReviews();
    });
});
