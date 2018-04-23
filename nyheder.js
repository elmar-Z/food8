        let jsonUrl = "http://mixel.dk/kea/food8/wordpress/wp-json/wp/v2/nyheder";
        let steder = [];

        let display = document.querySelector("section");
        let template = document.querySelector("template");

        document.addEventListener("DOMContentLoaded", hentJson);

        async function hentJson() {
            let dataJson = await fetch(jsonUrl);
            steder = await dataJson.json();
            console.log(steder);

            visSteder();

        }

        function visSteder() {
            steder.forEach(sted => {
                let klon = template.cloneNode(true).content;

                klon.querySelector("[data-header]").textContent = sted.title.rendered;

                klon.querySelector("[data-image]").src = sted.acf.billede.url;

                klon.querySelector("[data-image]").alt = sted.title.rendered;

                klon.querySelector("article").addEventListener("click", () => {
                     location.href = "single-nyheder.html?id=" + sted.id;
                 });

                display.appendChild(klon);
            });
        }
