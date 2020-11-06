import sha1 from "crypto-js/sha1";

/* eslint-disable no-undef */
const NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
const NEXT_PUBLIC_CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const NEXT_PUBLIC_CLOUDINARY_API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
/* eslint-enable no-undef */

const DEFAULT_UPLOAD_OPTIONS = {
  format: "webp",
  transformation: "q_auto"
};

/**
 * Uploads a file using Cloudinary API
 *
 * @param {object|string} file - File to be uploaded
 * @param {object} [options] - Additional options for the upload
 */
export function upload(file, options = {}) {
  const timestamp = Date.now().toString().substring(0, 10);
  const optionsWithTimestamp = {
    ...DEFAULT_UPLOAD_OPTIONS,
    ...options,
    timestamp
  };
  const signature = generateSignature(optionsWithTimestamp);

  const data = new FormData();
  data.append("file", file);
  data.append("signature", signature);
  data.append("api_key", NEXT_PUBLIC_CLOUDINARY_API_KEY);

  for (const key of Object.keys(optionsWithTimestamp)) {
    data.append(key, optionsWithTimestamp[key]);
  }

  return fetch(NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: data
  });
}

/**
 * Generates signature from options
 *
 * @param {Object} options
 * @returns {String} Signature
 */
function generateSignature(options) {
  const sortedKeys = Object.keys(options).sort();
  const keyValuePairString = sortedKeys.map((key) => `${key}=${options[key]}`).join("&");
  const digest = sha1(`${keyValuePairString}${NEXT_PUBLIC_CLOUDINARY_API_SECRET}`);

  return digest;
}

const CLOUDINARY_DOMAIN = "cloudinary.com";

export function isCloudinaryDomain(url) {
  let res = false;
  try {
    const regexp = new RegExp(CLOUDINARY_DOMAIN, "i");
    const domain = new URL(url).hostname;
    if (regexp.test(domain)) {
      res = true;
    }
  } catch {
    // Do nothing
  }

  return res;
}

/**
 * Use cloudinary fetch for external images
 * @param {string} url - Image URL
 * @returns {string} Cloudinary URL
 */
export function getCloudinaryImageUrl(url = "", isThumbnail = false) {
  if (url) {
    let cloudinaryUrl = url;
    if (!isCloudinaryDomain(url)) {
      cloudinaryUrl = `https://res.cloudinary.com/what-to-cook/image/fetch/f_auto${
        isThumbnail ? ",c_limit,h_100,w_150" : ""
      }/${encodeURIComponent(url)}`;
      return cloudinaryUrl;
    }

    cloudinaryUrl = url.replace(
      "/image/upload",
      isThumbnail ? "/image/upload/c_thumb,f_auto,h_100,w_150" : "/image/upload/f_auto"
    );

    return cloudinaryUrl;
  }

  return url;
}
