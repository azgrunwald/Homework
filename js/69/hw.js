/* global google */
const key = "";
const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
  google.maps.importLibrary("maps"),
  google.maps.importLibrary("marker"),
]);

const loc = { lat: 40.09543950426593, lng: -74.2221793333354 };
const places = JSON.parse(localStorage.getItem("places")) ?? [];

const map = new Map(document.querySelector("#map"), {
  center: loc,
  zoom: 18,
  mapId: "DEMO_MAP_ID",
});

console.log(places);

places.forEach((place) => {
  new AdvancedMarkerElement({
    map,
    position: place.loc,
    title: place.title,
  });
});

const placesList = document.querySelector("#places");
const searchInput = document.querySelector("#search");
const clear = document.querySelector("#clear")

const infoWindow = new InfoWindow();

let currentlySelectedSummary;

clear.addEventListener('click', () => {
  localStorage.removeItem("places");
})

document.querySelector("#searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `http://api.geonames.org/wikipediaSearch?q=${searchInput.value}&maxRows=10&username=${key}&type=json`,
    );

    if (!response.ok) {
      throw new Error(`${response.status}  ${response.statusText}`);
    }

    const { geonames } = await response.json();
    console.log(geonames);

    const bounds = new google.maps.LatLngBounds();

    geonames.forEach((place) => {
      const loc = { lat: place.lat, lng: place.lng };

      const marker = new AdvancedMarkerElement({
        map,
        position: loc,
        title: place.title,
      });

      marker.addListener("click", () => {
        infoWindow.setContent(
          `<div><h5>${place.title}</h5>${place.summary}<a target="_blank" href="https://${place.wikipediaUrl}">more info</a></div>`,
        );
        infoWindow.open({
          anchor: marker,
        });
      });

      bounds.extend(loc);

      const placeLi = document.createElement("li");
      placeLi.innerHTML = `
        <div>
          <div class="info">
            <span>${place.title}</span>
          </div>
          <div class="summary">${place.summary}</div>
        </div>`;
      placesList.append(placeLi);

      const summary = placeLi.querySelector(".summary");

      placeLi.addEventListener("click", async () => {
        map.setZoom(6);

        if (currentlySelectedSummary) {
          currentlySelectedSummary.classList.remove("active");
        }
        currentlySelectedSummary = summary;

        currentlySelectedSummary.classList.add("active");
        await doAfter(() => map.panTo(loc), 1500);
        await doAfter(() => map.setZoom(18), 1500);
      });
    });

    map.fitBounds(bounds);

    geonames.forEach((place) => {
      places.push({
        loc: { lat: place.lat, lng: place.lng },
        title: place.title,
      });
    });
    localStorage.setItem("places", JSON.stringify(places));
    console.log("Immediately saved:", localStorage.getItem("places"));
  } catch (e) {
    console.error(e);
  }
});

function doAfter(action, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      action();
      resolve();
    }, delay);
  });
}
