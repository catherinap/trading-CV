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
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(img) {
    const captionEl = img.closest(".gallery-card")?.querySelector(".gallery-caption");

    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || "";
    lightboxCaption.textContent = captionEl
        ? captionEl.textContent.trim()
        : (img.alt || "");

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
}

document.querySelectorAll("#gallery .zoomable").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
    }
});





