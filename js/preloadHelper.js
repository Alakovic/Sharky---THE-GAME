/**
 * Recursively add all image paths from a nested object to a Preloader.
 * @param {Object} obj - The object containing image paths or nested objects.
 * @param {Preloader} preloader - The Preloader instance to add images to.
 */
function addImagesFromObject(obj, preloader) {
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      preloader.addImages(obj[key]);
    } else if (typeof obj[key] === "object") {
      addImagesFromObject(obj[key], preloader);
    }
  }
}

/**
 * Preload all game assets defined in the GameAssets object.
 * @async
 * @returns {Promise<HTMLImageElement[]>} A promise that resolves with an array of all loaded images.
 */
async function preloadGameAssets() {
  const preloader = new Preloader();
  addImagesFromObject(GameAssets, preloader);
  try {
    const loadedAssets = await preloader.loadAll();
    return loadedAssets;
  } catch (err) {
    console.error("Error:", err);
  }
}
