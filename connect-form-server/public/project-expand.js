document.addEventListener("DOMContentLoaded", () => {
    const timelineItems = document.querySelectorAll(".timeline-item");

    timelineItems.forEach((item) => {
        item.addEventListener("click", () => {
            const details = item.querySelector(".timeline-details");
            const arrowIcon = item.querySelector(".arrow-icon");

            if (!details) return;

            // Toggle expansion
            const isExpanded = item.classList.contains("expanded");

            if (isExpanded) {
                details.style.maxHeight = "0px";
                details.style.opacity = "0";
                details.style.paddingTop = "0";
            } else {
                details.style.maxHeight = details.scrollHeight + "px";
                details.style.opacity = "1";
                details.style.paddingTop = "1rem";
            }

            // Toggle class to apply CSS styles
            item.classList.toggle("expanded");

            // Rotate arrow icon
            arrowIcon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
        });
    });
});