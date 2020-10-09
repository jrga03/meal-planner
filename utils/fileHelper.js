/**
 * Converts file to base64 image
 * @param {object} file - File blob
 * @returns Base64 image
 */
export async function fileToBase64Img(file) {
  const reader = new FileReader();
  const image = new Promise((resolve) => {
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

  return await image;
}
