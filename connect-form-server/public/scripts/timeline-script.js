document.addEventListener("DOMContentLoaded", () => {
    const timelineItems = document.querySelectorAll(".timeline-item");

    timelineItems.forEach((item) => {
        const expandHint = item.querySelector(".expand-hint");
        const details = item.querySelector(".timeline-details");
        const arrowIcon = expandHint.querySelector(".arrow-icon");

        expandHint.addEventListener("click", () => {
            const isExpanded = item.classList.contains("expanded");
            
            // Close all expanded items before expanding the clicked one
            timelineItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains("expanded")) {
                    otherItem.classList.remove("expanded");
                    otherItem.querySelector(".timeline-details").style.maxHeight = "0";
                    otherItem.querySelector(".expand-hint .arrow-icon").style.transform = "rotate(0deg)";
                }
            });

            // Toggle the clicked item's expansion state
            if (isExpanded) {
                item.classList.remove("expanded");
                details.style.maxHeight = "0";
                arrowIcon.style.transform = "rotate(0deg)";
            } else {
                item.classList.add("expanded");
                details.style.maxHeight = details.scrollHeight + "px";
                arrowIcon.style.transform = "rotate(180deg)";
            }
        });
    });
});