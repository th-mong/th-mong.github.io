document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in");

    function handleScroll() {
        faders.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;

            if (isVisible) {
                el.classList.add("show");
            }
        });
        }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
});
    