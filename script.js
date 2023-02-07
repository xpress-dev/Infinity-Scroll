const apiKey = '5NGQI3QaEDoAkjkvTxk6EKxjexZmql7JI9xfB6oi_Lk';
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');
let photoArray = [];
let loadedImages = [];
let currentBatchLoaded = false;

// Show Loader While Loading
function showLoader() {
  loader.style.display = 'block';
}

// Hide Loader After Loading Is Complete
function hideLoader() {
  loader.style.display = 'none';
}

// Fetch photos from Unsplash API
async function getPhotos() {
  showLoader();
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// Display the fetched photos
function displayPhotos() {
  photoArray.forEach((photo, index) => {
    // Create the <a> element to finally lead to its Unsplash page
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    // Create the <img> element to display
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    // Creating the correct HTML Hierarchy
    imageContainer.appendChild(item);
    item.appendChild(img);
    // Checking if all the images are loaded
    img.addEventListener('load', function () {
      loadedImages.push(index);
      if (loadedImages.length === photoArray.length) {
        loadedImages = [];
        currentBatchLoaded = true;
        hideLoader();
      }
    });
  });
}

// Load More Photos
document.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 2000 &&
    currentBatchLoaded
  ) {
    getPhotos();
    currentBatchLoaded = false;
  }
});

// On Load
getPhotos();
