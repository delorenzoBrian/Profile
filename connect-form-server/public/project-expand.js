document.addEventListener("DOMContentLoaded", () => {
    // Select all project cards
    const projectCards = document.querySelectorAll(".project-card");

    // Add click event listener to each card
    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            // Toggle the "expanded" class on the clicked card
            const isExpanded = card.classList.contains("expanded");

            // Collapse all other cards
            projectCards.forEach((otherCard) => {
                if (otherCard !== card) {
                    otherCard.classList.remove("expanded");
                }
            });

            // Expand or collapse the clicked card
            if (isExpanded) {
                card.classList.remove("expanded");
            } else {
                card.classList.add("expanded");
            }
        });
    });
});