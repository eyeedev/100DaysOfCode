const filterItems = document.querySelectorAll(".filter-item");
const projectCards = document.querySelectorAll(".project-card");

filterItems.forEach(item => {
    item.addEventListener("click", () => {
        // حذف کلاس active از همه
        filterItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const filter = item.getAttribute("data-filter");

        projectCards.forEach(card => {
            if (filter === "all" || card.getAttribute("data-type") === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});