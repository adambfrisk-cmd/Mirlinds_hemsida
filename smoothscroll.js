document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");

    if (!header) return;


    // Kontrollera vilken sida vi är på
    const currentPage =
        window.location.pathname.split("/").pop();


    // Ingen sticky header på startsidan
    if (
        currentPage === "main.html" ||
        currentPage === "" ||
        currentPage === "/"
    ) {
        return;
    }


    // Skapa ett element som behåller platsen
    // när headern blir position: fixed
    const headerPlaceholder =
        document.createElement("div");

    headerPlaceholder.style.display = "none";

    header.after(headerPlaceholder);


    // Spara positionen där headern ska bli sticky
    let stickyTrigger =
        header.offsetTop + header.offsetHeight;


    function updateStickyHeader() {

        if (window.scrollY > stickyTrigger) {

            if (!header.classList.contains("is-sticky")) {

                // Behåll headerns ursprungliga plats
                headerPlaceholder.style.height =
                    `${header.offsetHeight}px`;

                headerPlaceholder.style.display = "block";

                // Aktivera sticky header
                header.classList.add("is-sticky");
            }

        } else {

            if (header.classList.contains("is-sticky")) {

                // Ta bort sticky header
                header.classList.remove("is-sticky");

                // Ta bort placeholder
                headerPlaceholder.style.display = "none";
            }
        }
    }


    window.addEventListener(
        "scroll",
        updateStickyHeader,
        { passive: true }
    );


    // Uppdatera positionen om fönstrets storlek ändras
    window.addEventListener("resize", () => {

        if (!header.classList.contains("is-sticky")) {

            stickyTrigger =
                header.offsetTop + header.offsetHeight;
        }

    });

});

// --- FUNKTION FÖR ATT KOPIERA STARTSIDANS LÄNK TILL URKLIPP ---
document.addEventListener("DOMContentLoaded", () => {
    const shareBtn = document.getElementById("share-btn");
    const tooltip = document.getElementById("share-tooltip");

    if (shareBtn && tooltip) {
        shareBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Hindrar sidan från att hoppa

            // Räknar ut den exakta länken till din startsida (main.html) oavsett var du är
            const mainPageUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/main.html');

            // Kopiera länken till urklippet
            navigator.clipboard.writeText(mainPageUrl).then(() => {
                // Visa den lilla bekräftelsetexten "Länk kopierad!"
                tooltip.classList.add("show-tooltip");

                // Dölj texten igen efter 1.2 sekunder (1200 millisekunder)
                setTimeout(() => {
                    tooltip.classList.remove("show-tooltip");
                }, 1200);
            }).catch(err => {
                console.error("Kunde inte kopiera länk: ", err);
            });
        });
    }
});
