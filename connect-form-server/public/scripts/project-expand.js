document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded Successfully!"); // Debugging

    // Timeline Expand Functionality
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (timelineItems.length === 0) {
        console.warn("No timeline items found. Ensure #timeline exists.");
        return;
    }

    timelineItems.forEach((item) => {
        item.addEventListener("click", () => {
            const details = item.querySelector(".timeline-details");

            if (!details) return;

            details.style.maxHeight = details.style.maxHeight ? "0px" : details.scrollHeight + "px";
            details.style.opacity = details.style.opacity === "1" ? "0" : "1";
            item.classList.toggle("expanded");
        });
    });

    // Restore Project Card Accordion Functionality
    const projectCards = document.querySelectorAll(".project-card");

    if (projectCards.length === 0) {
        console.warn("No project cards found.");
        return;
    }

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
});