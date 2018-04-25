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
		}
	});
}

/*function initMap() {
	var centrum =  { lat: 55.676097, lng: 12.568337 }
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: centrum
	});
	var marker1 = new google.maps.Marker({
		position: {lat: 55.684145, lng: 12.568984 },
		title: "Cleaver's",
		map: map
	});
	let infowindow = new google.maps.InfoWindow({
		content: document.querySelector("[data-header]").getContext;
	});
	marker1.addListener("click", () => {
		infowindow.open(map, marker);
	});
} */

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 55.684145, lng: 12.568984}
        });
        var geocoder = new google.maps.Geocoder();

		document.getElementById('submit').addEventListener('click', function() {
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
