// _________________________________________Back To Top_________________________________________
window.onscroll = function () {
  let pageOffset = window.scrollY;
  let backToTopButton = document.querySelector(".backToTop");

  if (pageOffset >= 500) {
    backToTopButton.style.opacity = 1; // Button fades in smoothly
  } else {
    backToTopButton.style.opacity = 0; // Button fades out smoothly
  }
};

// _________________________________________Carousel Images_________________________________________
let carouselImages = document.querySelectorAll(".scrollingImages");
let carouselPosition = [0, -100, -200];
let pos = 1;
let intervalId;

function changeImageForward() {
  setIndexBullets(pos);
  carouselImages.forEach((image) => {
    image.style.transition = "transform 1s";
    image.style.transform = `translateX(${carouselPosition[pos]}%)`;
  });
  if (pos == 2) {
    setTimeout(() => {
      // Snap back to position 1 after a brief delay
      carouselImages.forEach((image) => {
        image.style.transition = "none";
        image.style.transform = `translateX(${carouselPosition[0]}%)`;
      });
      pos = 1; // Reset position to 1
    }, 1000); // Adjust the delay
  } else {
    pos++;
  }
}
function changeImageBackward() {
  setIndexBullets(pos);
  carouselImages.forEach((image) => {
    image.style.transition = "transform 1s";
    image.style.transform = `translateX(${carouselPosition[pos]}%)`;
  });
  if (pos == 0) {
    setTimeout(() => {
      // Snap back to position 1 after a brief delay
      carouselImages.forEach((image) => {
        image.style.transition = "none";
        image.style.transform = `translateX(${carouselPosition[2]}%)`;
      });
      pos = 1; // Reset position to 1
    }, 1000); // Adjust the delay
  } else {
    pos--;
  }
}

function startCarousel() {
  intervalId = setInterval(changeImageForward, 4500);
}

// Function to stop the carousel
function stopCarousel() {
  clearInterval(intervalId);
}
startCarousel();

// _________________________________________Carousel BulletIndex_____________________________________
let bulletIndex = document.querySelector(".bulletIndex");
const setIndexBullets = (pos) => {
  if (pos == 2 || pos == 0) {
    bulletIndex.innerHTML = "<li> &#x25CF</li><li>&#x25CB</li>";
  } else bulletIndex.innerHTML = "<li>&#x25CB</li><li> &#x25CF</li>";
};

//_________________________________________Carousel Pause Button______________________________________
function handleHoverChange(button, newClass) {
  const icon = button.querySelector("i");
  icon.className = newClass;
}
let currentState = "pause";
let pauseButton = document.querySelector("#carousel-pause");

pauseButton.addEventListener("mouseenter", () => {
  if (currentState == "pause") {
    handleHoverChange(pauseButton, "fa-solid fa-circle-pause");
  } else {
    handleHoverChange(pauseButton, "fa-solid fa-circle-play");
  }
});

pauseButton.addEventListener("mouseleave", () => {
  if (currentState == "pause") {
    handleHoverChange(pauseButton, "fa-regular fa-circle-pause");
  } else {
    handleHoverChange(pauseButton, "fa-regular fa-circle-play");
  }
});

pauseButton.addEventListener("click", () => {
  if (currentState == "pause") {
    currentState = "play";
    handleHoverChange(pauseButton, "fa-solid fa-circle-play");
    stopCarousel();
  } else if (currentState == "play") {
    currentState = "pause";
    handleHoverChange(pauseButton, "fa-solid fa-circle-pause");
    startCarousel();
  }
});

//_________________________________________Carousel Next Button______________________________________
let nextButton = document.querySelector("#carousel-right");
let prevButton = document.querySelector("#carousel-left");

nextButton.addEventListener("click", changeImageForward);
prevButton.addEventListener("click", changeImageBackward);
