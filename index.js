// dom methods
const imageSelector = document.getElementById("image-conatiner");
const loader = document.getElementById("loader");

let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//images loaded function
function imageLoaded() {
  console.log("images loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    console.log("ready" + ready);
  }
}

// set attributes function so that we dont require to write it repaatedly
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// display photos  function
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  console.log("total images ", totalImages);
  photoArray.forEach((e) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: e.links.html,
      target: "_blank",
    });

    // creating image element
    const img = document.createElement("img");
    setAttributes(img, {
      src: e.urls.regular,
      alt: e.alt_description,
      title: e.alt_description,
    });

    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageSelector.appendChild(item);
  });
}

// unsplash api fetching
const count = 30;
const apiKey = "6PEqyGXLWcHJUpW2tO5sfDCULV-LFgiFsF8Ep5eKMf8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// creating a fetch request for the images

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    console.log(photoArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

//onload
getPhotos();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log("load more");
  }
});
