const partsSection = document.querySelector(".partsSection");
let offset;
let dragee = null;
let highestZIndex = 0;

try {
  const response = await fetch("parts.json");

  if (!response.ok) {
    console.error("error fetching parts 1");
  }
  const parts = await response.json();
  console.log(parts);

  parts.forEach((part) => {
    const image = document.createElement("img");
    image.src = part.url;
    image.alt = part.name;
    image.style.position = "absolute";
    image.style.cursor = "grab";

    partsSection.append(image);
  });
} catch {
  console.error("error fetching parts 2");
}

partsSection.addEventListener("mousedown", (e) => {
  e.preventDefault();
  if (e.target.tagName === "IMG") {
    offset = { x: e.offsetX, y: e.offsetY };
    dragee = e.target;
    dragee.style.zIndex = ++highestZIndex;
  }
});

document.addEventListener("mousemove", (e) => {
  if (dragee) {
    dragee.style.top = `${e.clientY - offset.y}px`;
    dragee.style.left = `${e.clientX - offset.x}px`;
  }
});
document.addEventListener("mouseup", (e) => {
  dragee = null;
});
