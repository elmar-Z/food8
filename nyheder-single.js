let urlParams = new URLSearchParams(window.location.search);
let urlID = urlParams.get('id');

let jsonUrl = "http://mixel.dk/kea/food8/wordpress/wp-json/wp/v2/nyheder";
let steder = [];


document.addEventListener("DOMContentLoaded", hentJson);

        async function hentJson() {
            let dataJson = await fetch(jsonUrl);
            steder = await dataJson.json();
            console.log(steder);

            visSteder();

        }

        function visSteder() {
            steder.forEach(sted => {

                if (sted.id == urlID) {
                    console.log(sted.id, urlID);

                document.querySelector("[data-header]").textContent = sted.title.rendered;

                document.querySelector("[data-image]").src = sted.acf.billede.url;

                document.querySelector("[data-image]").alt = sted.title.rendered;

                document.querySelector("[data-description]").innerHTML = sted.content.rendered;

                }
            });
        }
