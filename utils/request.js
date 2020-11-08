/**
 * Parse error message from error object
 * @param {object} [error] - Error object
 * @param {string} [string] - Fallback error message
 * @returns {string} Error message
 */
export function getErrorMessage(error = {}, fallbackMessage = "Something went wrong") {
  return error?.response?.message || fallbackMessage;
}

/**
 * Requests a URL, returning a promise
 * @param {string} url - The URL we want to request
 * @param {object} [options] - The options we want to pass to "fetch"
 * @return {object} The response data
 */
export default async function Fetch(url, options) {
  const res = await fetch(url, options);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error(res.statusText || "An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.response = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}
