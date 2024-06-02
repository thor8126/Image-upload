const dropArea = document.getElementById("drop-area");

const inputFile = document.getElementById("input-file");

const imgView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

const imageLinkList = [];

function uploadImage() {
  // 1. get the selected image by user
  const imageLink = URL.createObjectURL(inputFile.files[0]);
  imageLinkList.push(imageLink);
  localStorage.setItem("imageLinkList", JSON.stringify(imageLinkList));
  // 2. show the selected image on the screen

  // how to add styles to HTml element using JS
  // targettedElement.style.propertyName = value;
  imgView.style.backgroundImage = `url(${imageLink})`;
  imgView.textContent = "";
  imgView.style.border = "none";
}

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();

  inputFile.files = event.dataTransfer.files;
  uploadImage();
});

// carousel
document.addEventListener("DOMContentLoaded", function () {
  const carouselImages = ["../carousel1.jpg", "../carousel2.jpg"];

  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  carouselImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    carousel.appendChild(img);
  });

  document.querySelector(".hero").appendChild(carousel);

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
  }, 5000);
});
