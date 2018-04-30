let urlParams = new URLSearchParams(window.location.search);
let urlID = urlParams.get('id');

let jsonUrl = "http://mixel.dk/kea/food8/wordpress/wp-json/wp/v2/steder";
let steder = [];


document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
	let dataJson = await fetch(jsonUrl);
	steder = await dataJson.json();
	console.log(steder);

	visSteder();

}

function visSteder()  {
	steder.forEach(sted => {

		if (sted.id == urlID) {
			console.log(sted.id, urlID);

			document.querySelector("[data-header]").textContent = sted.title.rendered;

			document.querySelector("[data-image]").src = sted.acf.logo.url;

			document.querySelector("[data-image]").alt = sted.title.rendered;


			document.querySelector("[data-description]").innerHTML = sted.content.rendered;

			document.querySelector("[data-hours]").innerHTML = sted.acf.aabningstider;

			document.querySelector("[data-menukort]").href = sted.acf.menu.url;

			document.querySelector("[data-address]").value = sted.acf.adresse;
			document.querySelector("[data-address]").innerHTML = sted.acf.adresse;

			document.querySelector("[data-booking]").value = sted.acf.email;

			console.log("value er indsat")
		}
	});
}

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 55.684145, lng: 12.568984}
        });
        var geocoder = new google.maps.Geocoder();

          window.addEventListener("load", function(){
          geocodeAddress(geocoder, map);
        });
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
