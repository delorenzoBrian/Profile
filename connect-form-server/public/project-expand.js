document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded Successfully!"); // Debugging check

    //  Timeline Expand Functionality
    const timelineItems = document.querySelectorAll(".timeline-item");

    timelineItems.forEach((item) => {
        item.addEventListener("click", () => {
            const details = item.querySelector(".timeline-details");

            if (!details) return; // Exit if no details section

            // Toggle max-height & opacity to expand/collapse
            if (details.style.maxHeight && details.style.maxHeight !== "0px") {
                details.style.maxHeight = "0px";
                details.style.opacity = "0";
                details.style.paddingTop = "0";
                item.classList.remove("expanded");
            } else {
                details.style.maxHeight = details.scrollHeight + "px";
                details.style.opacity = "1";
                details.style.paddingTop = "1rem";
                item.classList.add("expanded");
            }
        });
    });

    //  Restore Project Card Accordion Functionality
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            const isExpanded = card.classList.contains("expanded");

            // Collapse all other project cards
            projectCards.forEach((otherCard) => {
                if (otherCard !== card) {
                    otherCard.classList.remove("expanded");
                }
            });

            // Toggle the clicked project card
            if (isExpanded) {
                card.classList.remove("expanded");
            } else {
                card.classList.add("expanded");
            }
        });
    });
});