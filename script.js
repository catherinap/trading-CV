const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.14,
    },
);

document.querySelectorAll(".fade-up").forEach((item) => observer.observe(item));

document.querySelectorAll(".copy-link").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const text = this.getAttribute("data-copy");

        navigator.clipboard.writeText(text).then(() => {
            const original = this.innerHTML;

            this.innerHTML = `
        <span>Copied!</span>
        <span>✓</span>
      `;

            setTimeout(() => {
                this.innerHTML = original;
            }, 1200);
        });
    });
});


const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".zoomable").forEach((img) => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
    });
});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        lightbox.classList.remove("active");
    }
});

const card = img.closest('.gallery-card');
const caption = card?.querySelector('figcaption')?.textContent || img.alt || '';
