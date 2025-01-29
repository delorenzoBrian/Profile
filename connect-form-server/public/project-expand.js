document.addEventListener("DOMContentLoaded", () => {
    // Select all project cards
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            const isExpanded = card.classList.contains("expanded");

            projectCards.forEach((otherCard) => {
                if (otherCard !== card) {
                    otherCard.classList.remove("expanded");
                }
            });

            if (isExpanded) {
                card.classList.remove("expanded");
            } else {
                card.classList.add("expanded");
            }
        });
    });

    // Timeline Expansion Logic
    const timelineItems = document.querySelectorAll(".timeline-item");

    timelineItems.forEach((item) => {
        item.addEventListener("click", () => {
            const content = item.querySelector(".content");

            if (!content) return;

            // Ensure all other items collapse before expanding the clicked one
            timelineItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.querySelector(".content").style.maxHeight = "0px";
                }
            });

            // Toggle expansion
            if (content.style.maxHeight === "0px" || !content.style.maxHeight) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0px";
            }
        });
    });
});