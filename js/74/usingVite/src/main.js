import "./style.css";
import img1 from "./media/1.png";
import img2 from "./media/2.png";
import img3 from "./media/3.png";
import img4 from "./media/4.png";
import img5 from "./media/5.png";
import img6 from "./media/6.png";
import img7 from "./media/7.png";
import img8 from "./media/8.png";
import img9 from "./media/9.png";
import img10 from "./media/10.png";
import img11 from "./media/11.png";
import img12 from "./media/12.png";
import img13 from "./media/13.png";
import img14 from "./media/14.png";
import img15 from "./media/15.png";
import img16 from "./media/16.png";
import img17 from "./media/17.png";
import img18 from "./media/18.png";
import img19 from "./media/19.png";
import img20 from "./media/20.png";
import img21 from "./media/21.png";
import img22 from "./media/22.png";
import img23 from "./media/23.png";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
];

let offset;
let draggee = null;
let nextZIndex = 1;
const mainElem = document.querySelector("#main");
let parts = [];

const sideBar = document.querySelector("#sidebar");

images.forEach((img) => {
  const image = document.createElement("img");
  image.src = img;
  image.classList.add("sidebarPart");
  sideBar.appendChild(image);
});


sideBar.addEventListener("mousedown", (e) => {
  if (e.target.id !== "sidebar") {
    const orig = e.target;
    const part = orig.cloneNode();
    part.classList.add("part");

    mainElem.appendChild(part);

    parts.push(part);
  }
});

window.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("part")) {
    console.log("mouse down", e);

    e.preventDefault();
    offset = { x: e.offsetX, y: e.offsetY };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseup", handleMouseUp);

    draggee = e.target;

    if (!e.target.classList.contains("potato")) {
      draggee.style.zIndex = nextZIndex++;
    }
  }
});

function handleMouseMove(e) {
  console.log("mouse move", e);

  draggee.style.top = `${e.clientY - offset.y}px`;
  draggee.style.left = `${e.clientX - offset.x}px`;
}

function handleMouseUp(e) {
  console.log("mouse up");

  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);

  saveState();
}

function saveState() {
  localStorage.setItem(
    "parts",
    JSON.stringify(
      parts.map((part) => {
        return {
          src: part.src,
          top: part.style.top,
          left: part.style.left,
          class: part.className,
          zIndex: part.style.zIndex,
        };
      }),
    ),
  );
}

function createPart(partData) {
  const p = document.createElement("img");
  p.src = partData.src;
  p.style.top = partData.top;
  p.style.left = partData.left;
  p.className = partData.class;
  p.style.zIndex = partData.zIndex;
  return p;
}

function loadStorage() {
  const loadedParts = JSON.parse(localStorage.getItem("parts")) ?? [];
  parts = loadedParts.map((part) => createPart(part));
  parts.forEach((p) => mainElem.appendChild(p));
}

loadStorage();
