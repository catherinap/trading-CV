const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.14,
    },
);

document.querySelectorAll(".fade-up, .reveal").forEach((item) => observer.observe(item));

const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

function handleNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 10) {
        navbar.classList.add("is-scrolled");
    } else {
        navbar.classList.remove("is-scrolled");
        navbar.classList.remove("is-hidden");
    }

    if (currentScrollY > 140 && currentScrollY > lastScrollY) {
        navbar.classList.add("is-hidden");
    } else {
        navbar.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
}

window.addEventListener("scroll", handleNavbar, { passive: true });
handleNavbar();

async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
}

document.querySelectorAll(".copy-link").forEach((link) => {
    link.addEventListener("click", async function (e) {
        e.preventDefault();

        const text = this.dataset.copy || "";
        if (!text) return;

        const originalHTML = this.innerHTML;

        try {
            await copyText(text);
            this.classList.add("is-copied");
            this.innerHTML = `
        <span>Copied</span>
        <span>✓</span>
      `;
        } catch (err) {
            this.innerHTML = `
        <span>Copy failed</span>
        <span>!</span>
      `;
        }

        setTimeout(() => {
            this.classList.remove("is-copied");
            this.innerHTML = originalHTML;
        }, 1200);
    });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(img) {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || "";
    lightboxCaption.textContent = img.alt || "";

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
        lightboxImg.src = "";
        lightboxCaption.textContent = "";
    }, 180);
}

document.querySelectorAll(".zoomable").forEach((img) => {
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