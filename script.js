document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.getElementById("thumbnails");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    const UNSPLASH_ACCESS_KEY = "HNVabON4JLAanYAgkdSKOdML_4p-oxj57xSa--DWMig";
    const UNSPLASH_API_URL = `https://api.unsplash.com/photos/?client_id=${UNSPLASH_ACCESS_KEY}&per_page=12`;

    // Fetch images from Unsplash API
    fetch(UNSPLASH_API_URL)
        .then(response => response.json())
        .then(data => {
            data.forEach(photo => {
                const img = document.createElement("img");
                img.src = photo.urls.small; // Thumbnail image
                img.alt = photo.alt_description || "Unsplash Image";
                img.dataset.large = photo.urls.full; // Full-size image for lightbox
                thumbnails.appendChild(img);

                // Add click event to open lightbox
                img.addEventListener("click", () => {
                    lightboxImage.src = img.dataset.large;
                    lightbox.classList.remove("hidden");
                });
            });
        })
        .catch(error => console.error("Error fetching images:", error));

    // Close lightbox
    closeLightbox.addEventListener("click", () => {
        lightbox.classList.add("hidden");
    });

    // Close lightbox on background click
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add("hidden");
        }
    });
});
