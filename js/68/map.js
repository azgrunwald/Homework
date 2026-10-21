/* global google */

async function init() {
  const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary("maps"),
    google.maps.importLibrary("marker"),
  ]);
  const goButton = document.querySelector("#go");
  const searchQuery = document.querySelector("#search");
  const username = "aarongrunwald";
  const infoWindow = new InfoWindow();
  const map = new Map(document.getElementById("map"), {
    center: { lat: 40.0954, lng: -74.2222 },
    zoom: 12,
    mapId: "DEMO_MAP_ID",
  });

  console.log("Google Maps API is working!");

  goButton.addEventListener("click", async () => {
    try {
      const response = await fetch(
        `http://api.geonames.org/wikipediaSearch?q=${searchQuery.value}&maxRows=5&username=${username}&type=json`,
      );
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      data.geonames.forEach((p) => {
        const loc = { lat: p.lat, lng: p.lng };
        let img;
        if (p.thumbnailImg) {
          img = document.createElement("img");
          img.src = p.thumbnailImg;
          img.className = "marker-img";
        }
        const marker = new AdvancedMarkerElement({
          map,
          position: loc,
          title: p.title,
           content: img,
        });

        marker.addEventListener("click", () => {
          infoWindow.setContent(
            `${p.summary} <a href="https://${
              p.wikipediaUrl
            }" target="_blank">more info</a>`,
          );
          infoWindow.open({
            anchor: marker,
          });
        });
      });
      console.log("GeoNames API Response:", data);
    } catch (e) {
      console.error(e);
    }
  });
}

init();
