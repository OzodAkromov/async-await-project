const API = "https://jsonplaceholder.typicode.com/photos";
const prev = document.querySelector(".slider .btns .prev");
const next = document.querySelector(".slider .btns .next");
const imagesDiv = document.querySelector(".slider .images");
let images = null;

const dotsDiv = document.querySelector(".slider .btns .dots");
let Indicators = null;
let dots = null;
let index = 0;

// Events
next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

// Get Images
async function getImages() {
  const res = await fetch(API);
  const data = await res.json();
  data.length = 16;

  data.forEach((image, idx) => {
    const imageUrl = image.url;
    const img = document.createElement("img");
    const dot = document.createElement("li");

    img.setAttribute("src", imageUrl);
    img.classList.add("active");
    dot.classList.add("dot", "active");

    imagesDiv.append(img);
    images = document.querySelectorAll(".slider .images img");
    dotsDiv.append(dot);
    dots = document.querySelectorAll(".slider .btns .dots .dot");
  });

  images.forEach((item) => {
    item.classList.remove("active");
    images[0].classList.add("active");
  });

  dots.forEach((item, idx) => {
    item.classList.remove("active");
    dots[0].classList.add("active");
  });
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", function () {
      dots[index].classList.remove("active");
      images[index].classList.remove("active");
      console.log(idx);

      index = idx;

      images[index].classList.add("active");
      dots[index].classList.add("active");
    });
  });
}
getImages();

window.addEventListener("keypress", function (event) {
  if (event.keyCode === 46) {
    return nextSlide();
  }

  if (event.keyCode === 44) {
    return nextSlide();
  }
});

// Next Slide
function nextSlide() {
  dots[index].classList.remove("active");
  images[index].classList.remove("active");
  index++;
  if (index === images.length) {
    index = 0;
  }
  images[index].classList.add("active");
  dots[index].classList.add("active");
}

// Prev Slide
function prevSlide() {
  images[index].classList.remove("active");
  dots[index].classList.remove("active");
  if (index === 0) {
    index = images.length;
  }
  index--;
  dots[index].classList.add("active");
  images[index].classList.add("active");
}